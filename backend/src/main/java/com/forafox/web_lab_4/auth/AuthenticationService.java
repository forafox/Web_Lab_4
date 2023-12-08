package com.forafox.web_lab_4.auth;


import com.forafox.web_lab_4.config.JwtService;
import com.forafox.web_lab_4.models.token.RefreshToken;
import com.forafox.web_lab_4.services.token.RefreshTokenService;
import com.forafox.web_lab_4.models.user.Role;
import com.forafox.web_lab_4.models.user.User;
import com.forafox.web_lab_4.models.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;

    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        var user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .age(request.getAge())
                .email(request.getEmail())
                .build();
        repository.save(user);
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = refreshTokenService.createRefreshToken(user.getId());
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .refreshToken(refreshToken)
                .build();
    }

    public AuthenticationResponse auth(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        var user = repository.findByUsername(request.getUsername())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = refreshTokenService.createRefreshToken(user.getId());
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .refreshToken(String.valueOf(refreshToken))
                .build();
    }

    public TokenRefreshResponse authWithRefreshToken(TokenRefreshRequest request) {

        String requestRefreshToken = request.getRefreshToken();

        Optional<RefreshToken> refreshToken2 = refreshTokenService.findByToken(requestRefreshToken);
        refreshTokenService.verifyExpiration(refreshToken2.get());
        User user2 = refreshToken2.get().getUser();
        jwtService.generateToken(user2);
        var jwtToken = jwtService.generateToken(user2);
        var refreshToken = refreshTokenService.createRefreshToken(user2.getId());

        return TokenRefreshResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .build();
    }
}