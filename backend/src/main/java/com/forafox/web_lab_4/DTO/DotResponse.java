package com.forafox.web_lab_4.DTO;


import com.forafox.web_lab_4.models.dot.Dot;
import com.forafox.web_lab_4.models.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.Duration;
import java.util.Date;

@Builder
public record DotResponse(
        Long id,
        float x,
        float y,
        float r,
        String status,
        String time,
        String username
   ){

};

