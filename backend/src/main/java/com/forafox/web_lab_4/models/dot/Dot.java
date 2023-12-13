package com.forafox.web_lab_4.models.dot;

import com.forafox.web_lab_4.models.user.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Duration;
import java.util.Date;
import java.util.Locale;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "dots")
public class Dot {
    @Id
    @GeneratedValue
    private Long id;
    @NotNull
    @Min(-2)
    @Max(2)
    private float x;
    @NotNull
    @Min(-5)
    @Max(3)
    private float y;
    @NotNull
    @Min(-2)
    @Max(2)
    private float r;
    private String status;
    private String time;
    @ManyToOne
    User user;
}
