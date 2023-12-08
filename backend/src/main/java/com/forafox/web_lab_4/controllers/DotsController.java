package com.forafox.web_lab_4.controllers;
import com.forafox.web_lab_4.DTO.DotRequest;
import com.forafox.web_lab_4.DTO.DotResponse;
import com.forafox.web_lab_4.DTO.DotsResponse;
import com.forafox.web_lab_4.auth.AuthenticationController;
import com.forafox.web_lab_4.services.dot.DotService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/canvas/")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class DotsController {

    @Autowired
    private DotService dotService;

    private final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);

    @PostMapping("/dot")
    public ResponseEntity<DotResponse> newDot(
            @RequestBody DotRequest dotRequest
    ) {
        logger.info("Request with a new point");
        return ResponseEntity.ok(dotService.saveDot(dotRequest));
    }

    @GetMapping("/dots")
    public ResponseEntity<DotsResponse> getAllDots() {
        logger.info("Request to receive points");
        return ResponseEntity.ok(dotService.getDots());
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
    ){
        logger.info("Request to delete a point");
        return ResponseEntity.ok(dotService.deleteDot(id));
    }
}
