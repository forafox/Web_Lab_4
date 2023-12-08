package com.forafox.web_lab_4.DTO;


import com.forafox.web_lab_4.models.dot.Dot;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DotResponse {
   Dot dot;
}
