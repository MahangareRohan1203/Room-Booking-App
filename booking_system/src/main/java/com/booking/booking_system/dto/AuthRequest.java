package com.booking.booking_system.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data

public class AuthRequest {
    private String username;
    private String password;
}
