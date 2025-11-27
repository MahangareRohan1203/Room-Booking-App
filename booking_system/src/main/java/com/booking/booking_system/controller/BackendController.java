package com.booking.booking_system.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BackendController {
    @GetMapping("/")
    public ResponseEntity<String> welcome() {
        return new ResponseEntity<>("Welcome to Backend", HttpStatus.OK);
    }
    
}


