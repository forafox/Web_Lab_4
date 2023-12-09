package com.forafox.web_lab_4.auth;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
@Builder
public record TokenRefreshRequest(
        String username,

        String password,

        @NotBlank
        String refreshToken
) {}

