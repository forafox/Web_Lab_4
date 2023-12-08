package com.forafox.web_lab_4.auth;

import com.forafox.web_lab_4.config.JwtService;
import com.forafox.web_lab_4.exception.TokenRefreshException;
import com.forafox.web_lab_4.models.RefreshToken;
import com.forafox.web_lab_4.services.RefreshTokenService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class AuthenticationController {

    @Autowired
    RefreshTokenService refreshTokenService;

    @Autowired
    JwtService jwtService;

    private final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);
    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ){
        logger.info("Registering a new user. Username: " + request.getUsername());
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/auth")
    public ResponseEntity<AuthenticationResponse> auth(
            @RequestBody AuthenticationRequest request
    ){
        logger.info("Authenticating new user. Username: " + request.getUsername());
        return ResponseEntity.ok(service.auth(request));
    }

    @PostMapping("/refreshtoken")
    public ResponseEntity<?> refreshtoken(
            @Valid @RequestBody TokenRefreshRequest request
    ) {
        logger.info("Refresh user. Username: " + request.getUsername());
        return ResponseEntity.ok(service.authWithRefreshToken(request));


//        String requestRefreshToken = request.getRefreshToken();
//
////        return refreshTokenService.findByToken(requestRefreshToken)
////                .map(refreshTokenService::verifyExpiration)
////                .map(RefreshToken::getUser)
////                .map(user -> {
//////                    String token = jwtService.auth(newuser.getUsername());
////                    String token = service.auth(request);
////                    return ResponseEntity.ok(new TokenRefreshResponse(token, requestRefreshToken));
////                })
////                .orElseThrow(() -> new TokenRefreshException(requestRefreshToken,
////                        "Refresh token is not in database!"));
    }
}