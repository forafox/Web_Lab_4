package com.forafox.web_lab_4.controllers;

import com.forafox.web_lab_4.DTO.DotRequest;
import com.forafox.web_lab_4.DTO.DotResponse;
import com.forafox.web_lab_4.DTO.email.EmailRequest;
import com.forafox.web_lab_4.DTO.email.EmailResponse;
import com.forafox.web_lab_4.auth.AuthenticationController;
import com.forafox.web_lab_4.contact.EmailService;
import com.forafox.web_lab_4.models.dot.DotRepository;
import com.forafox.web_lab_4.services.dot.DotService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.security.Principal;

@RestController
@RequestMapping("/api/email/")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class EmailController {
    private final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);



    @Autowired
    private EmailService emailService;

    @PostMapping("/contact")
    public ResponseEntity<String> postContact(
            @RequestBody EmailRequest emailRequest
    ) throws MessagingException, UnsupportedEncodingException {
        logger.info("Request with new contact message");
        emailService.sendContactMessage(emailRequest);
        return ResponseEntity.ok("Message sent");
    }
}
