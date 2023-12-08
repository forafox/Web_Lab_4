package com.forafox.web_lab_4.models.dot;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    private boolean status;
    private String time;
    private long scriptTime;

    public String getStatus() {
        if (status) return "Hit!";
        else return "Miss!";
    }

    public String toJSON() {
        return String.format(Locale.US, """
                {
                "x": %.3f,
                "y": %.3f,
                "r": %.3f,
                "status": "%s",
                "time": "%s",
                "scriptTime": %d
                }
                """, x, y, r, getStatus(), time, scriptTime);
    }
}
