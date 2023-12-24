package com.forafox.web_lab_4.auth;


import com.forafox.web_lab_4.config.JwtService;
import com.forafox.web_lab_4.exception.TokenRefreshException;
import com.forafox.web_lab_4.models.token.RefreshToken;
import com.forafox.web_lab_4.services.token.RefreshTokenService;
import com.forafox.web_lab_4.models.user.Role;
import com.forafox.web_lab_4.models.user.User;
import com.forafox.web_lab_4.models.user.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final JavaMailSender mailSender;
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;
    private final UserDetailsService userDetailsService;

    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) throws MessagingException, UnsupportedEncodingException {


        String randomCode= UUID.randomUUID().toString();//

        var user = User.builder()
                .username(request.username())
                .verificationCode(randomCode)
                .password(passwordEncoder.encode(request.password()))
                .role(Role.USER)
                .enabled(false)
                .age(request.age())
                .email(request.email())
                .build();
        repository.save(user);
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = refreshTokenService.createRefreshToken(user.getId());
        sendVerificationEmail(user);// send email
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .refreshToken(refreshToken)
                .build();
    }

    public AuthenticationResponse auth(AuthenticationRequest request) {
        User user;
        if(request.username().contains("@")){
             user =repository.findByEmail(request.username())
                     .orElseThrow();
        }else {
             user = repository.findByUsername(request.username())
                    .orElseThrow();
        }
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getUsername(),
                        request.password()
                )
        );
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = refreshTokenService.createRefreshToken(user.getId());
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .refreshToken(String.valueOf(refreshToken))
                .build();
    }

    public TokenRefreshResponse refreshAccessToken(TokenRefreshRequest request) {

        String requestRefreshToken = request.refreshToken();

        Optional<RefreshToken> refreshTokenFromDB = refreshTokenService.findByToken(requestRefreshToken);
        if (refreshTokenFromDB.isEmpty()) {
            throw new TokenRefreshException(null, "Refresh token was expired. Please make a new signin request");
        } else {
            refreshTokenService.verifyExpiration(refreshTokenFromDB.get());
            User user = refreshTokenFromDB.get().getUser();
            jwtService.generateToken(user);
            var jwtToken = jwtService.generateToken(user);
            var refreshToken = refreshTokenService.createRefreshToken(user.getId());

            return TokenRefreshResponse.builder()
                    .accessToken(jwtToken)
                    .refreshToken(refreshToken)
                    .build();
        }
    }

    private void sendVerificationEmail(User user)
            throws MessagingException, UnsupportedEncodingException {
        String toAddress = user.getEmail();
        String fromAddress = "forafoxy@gmail.com";
        String senderName = "Forafox-Company";
        String subject = "Please verify your registration";
        String content = "Dear [[name]],<br>"
                + "Please click the link below to verify your registration:<br>"
                + "<h3><a href=\"[[URL]]\" target=\"_self\">VERIFY</a></h3>"
                + "Thank you,<br>"
                + "Your Forafox-Company.";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);

        content = content.replace("[[name]]", user.getUsername());
        String verifyURL = "http://localhost:8080"+"/api/v1/auth"+"/verify"+"?code="+user.getVerificationCode();

        content = content.replace("[[URL]]", verifyURL);

        helper.setText(content, true);

        mailSender.send(message);

    }

    public boolean verifyWithEmailCode(String verificationCode) {
        Optional<User> userOptional = repository.findByVerificationCode(verificationCode);

        if (userOptional.isEmpty() || userOptional.get().isEnabled()) {
            return false;
        } else {
            User user = userOptional.get();
            user.setVerificationCode(null);
            user.setEnabled(true);
            repository.save(user);
            return true;
        }
    }



}