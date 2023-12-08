package com.forafox.web_lab_4.DTO;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DotRequest {
    private Long id ;
    private float x = 0.0f;
    private float y = 0.0f;
    private float r = 2.0f;
}
