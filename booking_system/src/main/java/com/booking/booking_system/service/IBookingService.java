package com.booking.booking_system.service;

import com.booking.booking_system.dto.BookingRequest;
import com.booking.booking_system.entity.Bookings;

import java.time.LocalDateTime;
import java.util.List;

public interface IBookingService {
    public List<Bookings> getBookedDetails(LocalDateTime from, LocalDateTime to);
    
    public boolean bookBed(BookingRequest bookingRequest);
    
    public List<Bookings> getBookingsByBed(Long bedId);
    
    public boolean updateBooking(BookingRequest bookingRequest);
    
    public boolean deleteBooking(Long bookingId);
}
