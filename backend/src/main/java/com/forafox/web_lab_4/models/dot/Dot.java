package com.forafox.web_lab_4.models.dot;

import com.forafox.web_lab_4.models.user.User;
import jakarta.persistence.*;
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
    private float x = 0.0f;
    private float y = 0.0f;
    private float r = 2.0f;
    private String status;
    private String time;
    @ManyToOne
    User user;
}
