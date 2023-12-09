package com.forafox.web_lab_4.DTO;

import com.forafox.web_lab_4.models.dot.Dot;
import lombok.AllArgsConstructor;
import lombok.Builder;
import java.util.List;

@Builder
public record DotsResponse(
    List<DotResponse> dots
){}
