package com.forafox.web_lab_4.controllers;

import com.forafox.web_lab_4.DTO.DotRequest;
import com.forafox.web_lab_4.DTO.DotResponse;
import com.forafox.web_lab_4.DTO.DotsResponse;
import com.forafox.web_lab_4.auth.AuthenticationController;
import com.forafox.web_lab_4.models.dot.Dot;
import com.forafox.web_lab_4.models.dot.DotRepository;
import com.forafox.web_lab_4.services.dot.DotService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v2/canvas/")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class DotsController {

    @Autowired
    private DotRepository repository;

    @Autowired
    private DotService dotService;

    private final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);

    @PostMapping("/dot")
    public ResponseEntity<DotResponse> newDot(
            Principal principal,
            @RequestBody DotRequest dotRequest
    ) {
        logger.info("Request with a new point");
        return ResponseEntity.ok(dotService.saveDot(dotRequest, principal.getName()));
    }



    @GetMapping("/dot/{id}")
    public ResponseEntity<DotResponse> getDotById(
            @PathVariable Long id
    ) {
        logger.info("Request to receive the point");
        return ResponseEntity.ok(dotService.getById(id));
    }

    @DeleteMapping("/dot/{id}")
    public ResponseEntity<DotResponse> deleteDotById(
            @PathVariable Long id
    ) {
        logger.info("Request to delete a point");
        return ResponseEntity.ok(dotService.deleteDot(id));
    }
    @DeleteMapping("/dots")
    public ResponseEntity<DotsResponse> deleteDotById(Principal principal
    ) {
        logger.info("Request to delete a point");
        return ResponseEntity.ok(dotService.clearDotsInBD(principal.getName()));
    }

    @GetMapping("/dots")
//    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<DotsResponse> getAllDots(Principal principal) {
        logger.info("Principal username: " + principal.getName());
        logger.info("Request to receive points");
        return ResponseEntity.ok(dotService.getDots(principal.getName()));
    }

    @GetMapping("/dotss/{page}/{size}")
    public ResponseEntity<DotsResponse> getAllDotsWithPage(
            Principal principal,
            @PathVariable int page,
            @PathVariable int size
           ) {
        try {
            return ResponseEntity.ok(dotService.getDotsWithPage(principal.getName(),page,size));
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
