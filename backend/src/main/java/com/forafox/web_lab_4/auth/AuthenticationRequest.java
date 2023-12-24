package com.forafox.web_lab_4.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Setter;

@Builder
public record AuthenticationRequest(
        String username,
        String password
) {
}