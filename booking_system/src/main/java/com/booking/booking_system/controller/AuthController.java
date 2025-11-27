package com.booking.booking_system.controller;

import com.booking.booking_system.dto.AuthRequest;
import com.booking.booking_system.dto.AuthResponse;
import com.booking.booking_system.entity.User;
import com.booking.booking_system.exceptions.CustomUnauthorizedException;
import com.booking.booking_system.repository.UserRepository;
import com.booking.booking_system.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        try {
            // 1. Authenticate using Spring Security
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );
            // 2. If authentication is successful, generate a token
            String token = jwtUtil.generateToken(request.getUsername());
            // 3. Return the token to the user
            return ResponseEntity.ok(new AuthResponse(token, "Login Successful!"));
            
        } catch (AuthenticationException e) {
            throw new CustomUnauthorizedException("Invalid credentials");
        }
    }
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestHeader("Passkey") String passkey, @RequestBody AuthRequest request) {
        
        if (passkey != null && !passkey.equals("myFirstApp")) {
            throw new CustomUnauthorizedException("Get Out boss !");
        }
        // Check if user already exists
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists");
        }
        // Create and save user
        User newUser = new User();
        newUser.setUsername(request.getUsername());
        newUser.setPassword(passwordEncoder.encode(request.getPassword())); // 🔒 Hash password
        userRepository.save(newUser);
        return ResponseEntity.status(201).body(new AuthResponse("", "Login to get token"));
    }
    
}
