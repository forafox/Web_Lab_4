package com.forafox.web_lab_4.DTO;

import com.forafox.web_lab_4.models.dot.Dot;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DotsResponse {
    List<Dot> dots;
}
