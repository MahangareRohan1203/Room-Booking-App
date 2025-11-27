package com.booking.booking_system.exceptions;

public class CustomUnauthorizedException extends RuntimeException {
    public CustomUnauthorizedException(String message) {
        super(message);
    }
}

