package com.forafox.web_lab_4.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
@Builder
public record RegisterRequest (

     String username,
     String password,
     String email,
     Integer age
){}
