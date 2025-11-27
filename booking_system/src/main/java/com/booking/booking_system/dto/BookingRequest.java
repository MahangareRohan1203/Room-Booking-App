package com.booking.booking_system.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class BookingRequest {
    private List<Long> bedList;
    private String mobileNumber;
    private String name;
    private LocalDateTime fromDate;
    private  LocalDateTime toDate;
    private Long bookingId;
}
