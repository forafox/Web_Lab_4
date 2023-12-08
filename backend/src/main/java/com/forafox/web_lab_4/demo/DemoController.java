package com.forafox.web_lab_4.demo;

import com.forafox.web_lab_4.auth.AuthenticationController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api/v2")
public class DemoController {
    private final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);

    @GetMapping("/hello")
    public ResponseEntity<String> sayHello(){
        logger.info("Saying hello on public endpoint");
        return ResponseEntity.ok("Hello from secured endpoint");
    }


    @GetMapping("/private")
    public ResponseEntity<String> sayPrivateHello(Principal user){
        logger.info("Saying hello on private endpoint. Username: " + user.getName());
        return ResponseEntity.ok(String.format("Hello %s. It is a private endpoint", user.getName()));
    }
}