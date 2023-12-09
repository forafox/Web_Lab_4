package com.forafox.web_lab_4.auth;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
public record TokenRefreshResponse (
     String accessToken,
     String refreshToken,
     String tokenType
){};
