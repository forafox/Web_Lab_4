package com.forafox.web_lab_4.auth;

import com.forafox.web_lab_4.config.JwtService;
import com.forafox.web_lab_4.services.token.RefreshTokenService;
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
    private final RefreshTokenService refreshTokenService;

    @Autowired
    private final JwtService jwtService;

    private final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);
    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ){
        logger.info("Registering a new user. Username: " + request.username());
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/auth")
    public ResponseEntity<AuthenticationResponse> auth(
            @RequestBody AuthenticationRequest request
    ){
        logger.info("Authenticating new user. Username: " + request.username());
        return ResponseEntity.ok(service.auth(request));
    }

    @PostMapping("/refreshtoken")
    public ResponseEntity<?> refreshtoken(
            @Valid @RequestBody TokenRefreshRequest request
    ) {
        logger.info("Refresh user. Username: " + request.username());
        return ResponseEntity.ok(service.refreshAccessToken(request));

    }
}