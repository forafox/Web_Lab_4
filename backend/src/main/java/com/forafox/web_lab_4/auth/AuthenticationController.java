package com.forafox.web_lab_4.auth;

import com.forafox.web_lab_4.config.JwtService;
import com.forafox.web_lab_4.exception.TokenRefreshException;
import com.forafox.web_lab_4.services.token.RefreshTokenService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;

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
    ) throws MessagingException, UnsupportedEncodingException {
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

    @GetMapping("/verify")
    public String verifyUser(@Param("code") String code) {
        if (service.verifyWithEmailCode(code)) {
            return "<div class=\"container text-center\">" +
                    "    <h3>Congratulations, your account has been verified.</h3>" +
                    "    <h4><a href=\"http://localhost:4200/auth\">Click here to Login</a></h4>" +
                    "</div>";
        } else {
            return "<div class=\"container text-center\">" +
                    "    <h3>Sorry, we could not verify account. It maybe already verified," +
                    "        or verification code is incorrect.</h3>" +
                    "</div>";
        }
    }

    @PostMapping("/refreshtoken")
    public ResponseEntity<?> refreshtoken(
            @Valid @RequestBody TokenRefreshRequest request
    ) {
        try {
            logger.info("Refresh user. Username: " + request.username());
            return ResponseEntity.ok(service.refreshAccessToken(request));
        } catch (TokenRefreshException e) {
            return ResponseEntity.status(401).body("Refresh token was expired. Please make a new signin request");
        }
    }
}