package com.booking.booking_system.exceptions;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(CustomBadRequestException.class)
    public ResponseEntity<ErrorResponse> handleCustomBadRequestException(CustomBadRequestException ex, HttpServletRequest request) {
        ErrorResponse error = new ErrorResponse(
                ex.getMessage(),
                request.getRequestURI(),
                LocalDateTime.now()
        );
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }
    
    @ExceptionHandler(CustomUnauthorizedException.class)
    public ResponseEntity<ErrorResponse> handleCustomUnauthorizedException(CustomUnauthorizedException ex, HttpServletRequest request) {
        ErrorResponse error = new ErrorResponse(
                ex.getMessage(),
                request.getRequestURI(),
                LocalDateTime.now()
        );
        return new ResponseEntity<>(error, HttpStatus.UNAUTHORIZED);
    }
    
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorResponse> handleRuntimeException(RuntimeException ex, HttpServletRequest request) {
        ErrorResponse error = new ErrorResponse(
                ex.getMessage(),
                request.getRequestURI(),
                LocalDateTime.now()
        );
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleAllExceptions(Exception ex, HttpServletRequest request) {
        ErrorResponse error = new ErrorResponse(
                ex.getMessage(),
                request.getRequestURI(),
                LocalDateTime.now()
        );
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
