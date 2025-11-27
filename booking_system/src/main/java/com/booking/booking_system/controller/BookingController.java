package com.booking.booking_system.controller;

import com.booking.booking_system.dto.AuthResponse;
import com.booking.booking_system.dto.BookingRequest;
import com.booking.booking_system.entity.Bookings;
import com.booking.booking_system.entity.User;
import com.booking.booking_system.exceptions.CustomBadRequestException;
import com.booking.booking_system.repository.UserRepository;
import com.booking.booking_system.security.JwtUtil;
import com.booking.booking_system.service.IBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private IBookingService bookingService;
    
    @GetMapping("/locations")
    public ResponseEntity<User> getUserDetails(@RequestHeader("Authorization") String token) {
        String username = jwtUtil.isValidToken(token);
        User user = userRepository.findByUsername(username).orElseThrow(() -> new CustomBadRequestException("User Not Found"));
        return ResponseEntity.ok(user);
    }
    
    @GetMapping("/checkAvailability")
    public ResponseEntity<List<Bookings>> getAvailability(@RequestHeader("Authorization") String token, @RequestParam String from, @RequestParam String to) {
        String username = jwtUtil.isValidToken(token);
        User user = userRepository.findByUsername(username).orElseThrow(() -> new CustomBadRequestException("User Not Found"));
        
        LocalDateTime start = LocalDateTime.parse(from, DateTimeFormatter.ISO_LOCAL_DATE_TIME);
        LocalDateTime end = LocalDateTime.parse(to, DateTimeFormatter.ISO_LOCAL_DATE_TIME);
        
        if (end.isBefore(start)) {
            throw new CustomBadRequestException("TO DATE cannot be smaller than START DATE");
        }
        List<Bookings> list = bookingService.getBookedDetails(start, end);
        return ResponseEntity.ok(list);
        
    }
    
    @PostMapping("")
    public ResponseEntity<AuthResponse> bookBed(@RequestHeader("Authorization") String token, @RequestBody BookingRequest bookingRequest) {
        String username = jwtUtil.isValidToken(token);
        User user = userRepository.findByUsername(username).orElseThrow(() -> new CustomBadRequestException("User Not Found"));
        
        if (bookingRequest.getToDate().isBefore(bookingRequest.getFromDate())) {
            throw new CustomBadRequestException("TO DATE cannot be smaller than START DATE");
        }
        
        // Restrict past bookings
        LocalDateTime nowInIST = LocalDateTime.now(ZoneId.of("Asia/Kolkata"));
        if (bookingRequest.getToDate().toLocalDate().isBefore(nowInIST.toLocalDate())) {
            throw new CustomBadRequestException("User cannot book for past date");
        }
        
        boolean status = bookingService.bookBed(bookingRequest);
        if (status) {
            AuthResponse authResponse = new AuthResponse("", "Successful");
            return ResponseEntity.status(201).body(authResponse);
        } else throw new CustomBadRequestException("Not booked");
    }
    
    @GetMapping("")
    public ResponseEntity<List<Bookings>> getBookingsByHome(@RequestHeader("Authorization") String token, @RequestParam Long bedId) {
        String username = jwtUtil.isValidToken(token);
        User user = userRepository.findByUsername(username).orElseThrow(() -> new CustomBadRequestException("User Not Found"));
        
        List<Bookings> list = bookingService.getBookingsByBed(bedId);
        return ResponseEntity.ok(list);
    }
    
    // only they can update fromDate, toDate, mobile, no.
    @PutMapping("")
    public ResponseEntity<AuthResponse> updateBooking(@RequestHeader("Authorization") String token, @RequestBody BookingRequest bookingRequest) {
        String username = jwtUtil.isValidToken(token);
        User user = userRepository.findByUsername(username).orElseThrow(() -> new CustomBadRequestException("User Not Found"));
        
        if (bookingRequest.getToDate().isBefore(bookingRequest.getFromDate())) {
            throw new CustomBadRequestException("To-Date cannot be smaller than Start-Date");
        }
        
        // Restrict past bookings
        LocalDateTime nowInIST = LocalDateTime.now(ZoneId.of("Asia/Kolkata"));
        if (bookingRequest.getToDate().toLocalDate().isBefore(nowInIST.toLocalDate())) {
            throw new CustomBadRequestException("User cannot book for past date");
        }
        
        boolean status = bookingService.updateBooking(bookingRequest);
        if (status) {
            AuthResponse authResponse = new AuthResponse("", "Successfully Updated");
            return ResponseEntity.status(201).body(authResponse);
        } else throw new CustomBadRequestException("Not booked");
    }
    
    @DeleteMapping("")
    public ResponseEntity<AuthResponse> deleteBooking(@RequestHeader("Authorization") String token, @RequestParam Long bookingId) {
        String username = jwtUtil.isValidToken(token);
        User user = userRepository.findByUsername(username).orElseThrow(() -> new CustomBadRequestException("User Not Found"));
        
        boolean status = bookingService.deleteBooking(bookingId);
        
        return ResponseEntity.ok(new AuthResponse("", "Booking Deleted Successfully"));
    }
}
