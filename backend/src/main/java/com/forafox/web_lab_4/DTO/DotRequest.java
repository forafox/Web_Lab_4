package com.forafox.web_lab_4.DTO;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
public record DotRequest(
        String username,
        Long id,
        float x,
        float y,
        float r
){}
