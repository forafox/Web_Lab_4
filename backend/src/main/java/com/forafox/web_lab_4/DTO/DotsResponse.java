package com.forafox.web_lab_4.DTO;

import lombok.Builder;
import java.util.List;

@Builder
public record DotsResponse(
    List<DotResponse> dots
){}
