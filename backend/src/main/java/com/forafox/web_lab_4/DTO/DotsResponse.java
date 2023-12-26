package com.forafox.web_lab_4.DTO;

import lombok.Builder;
import java.util.List;

@Builder
public record DotsResponse(
    List<DotResponse> dots,
    int currentPage,
    Long totalItems,
    int totalPages,

    String message
){}
