package com.booking.booking_system.controller;

import com.booking.booking_system.entity.User;
import com.booking.booking_system.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class GreetingsController {
    @Autowired
    private JwtUtil jwtUtil;
    
    @GetMapping("/hello")
    public ResponseEntity<String> hello() {
        return new ResponseEntity<>("Hello", HttpStatus.OK);
    }
    
    @GetMapping("/greetings")
    public ResponseEntity<String> getGreetings(@RequestHeader("Authorization") String token) {
        String username = jwtUtil.isValidToken(token);
        return ResponseEntity.ok("Hello, " + username + "!");
    }
    
}
