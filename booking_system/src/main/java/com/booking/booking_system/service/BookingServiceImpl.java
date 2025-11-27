package com.booking.booking_system.service;

import com.booking.booking_system.dto.BookingRequest;
import com.booking.booking_system.entity.Bed;
import com.booking.booking_system.entity.Bookings;
import com.booking.booking_system.entity.Customer;
import com.booking.booking_system.exceptions.CustomBadRequestException;
import com.booking.booking_system.repository.BedRepository;
import com.booking.booking_system.repository.BookingRepository;
import com.booking.booking_system.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BookingServiceImpl implements IBookingService {
    
    @Autowired
    private BookingRepository bookingRepository;
    
    @Autowired
    private BedRepository bedRepository;
    
    @Autowired
    private CustomerRepository customerRepository;
    
    @Override
    public List<Bookings> getBookedDetails(LocalDateTime from, LocalDateTime to) {
        List<Bookings> list = bookingRepository.findByDateOverlap(from, to);
        return list;
    }
    
    @Override
    @Transactional
    public boolean bookBed(BookingRequest bookingRequest) {
        List<Bookings> list = bookingRepository.findByDateOverlapAndBed(bookingRequest.getFromDate(), bookingRequest.getToDate(), bookingRequest.getBedList());
        
        if (list.size() > 0) {
            Optional<Bed> bedName = bedRepository.findById(list.get(0).getBedId());
            throw new CustomBadRequestException("Bed Already Booked " + bedName.get().getName());
        }
        
        list = new ArrayList<>();
        
        Customer customer = new Customer();
        customer.setName(bookingRequest.getName());
        customer.setMobileNumber(bookingRequest.getMobileNumber());
        customer = customerRepository.save(customer);
        
        for (int i = 0; i < bookingRequest.getBedList().size(); i++) {
            Bookings b = new Bookings();
            b.setFromDate(bookingRequest.getFromDate());
            b.setToDate(bookingRequest.getToDate());
            b.setCustomer(customer);
            b.setBedId(bookingRequest.getBedList().get(i));
            b = bookingRepository.save(b);
        }
        return true;
    }
    
    @Override
    public List<Bookings> getBookingsByBed(Long bedId) {
        List<Bookings> list = bookingRepository.findByBedId(bedId);
        return list;
    }
    
    @Override
    public boolean updateBooking(BookingRequest bookingRequest) {
        Bookings booking = bookingRepository.findById(bookingRequest.getBookingId()).orElseThrow(() -> new CustomBadRequestException("Booking Not Found"));
        
        // check bed is booked in that span
        List<Bookings> list = bookingRepository.findByDateOverlapAndBed(bookingRequest.getFromDate(), bookingRequest.getToDate(), List.of(booking.getBedId()));
        
        // logic for update
        if ((list.size() == 1 && list.get(0).getBookingId() == bookingRequest.getBookingId()) || list.size() == 0) {
            booking.setFromDate(bookingRequest.getFromDate());
            booking.setToDate(booking.getToDate());
            booking.setToDate(bookingRequest.getToDate());
            Customer customer = booking.getCustomer();
            customer.setMobileNumber(bookingRequest.getMobileNumber());
            customer.setName(bookingRequest.getName());
            customer = customerRepository.save(customer);
            booking = bookingRepository.save(booking);
            return true;
        } else {
            throw new CustomBadRequestException("Already booking exists for selected span");
        }
        
        
    }
    
    @Override
    public boolean deleteBooking(Long bookingId) {
        Bookings booking = bookingRepository.findById(bookingId).orElseThrow(() -> new CustomBadRequestException("Booking Not found"));
        booking.setIsDeleted(true);
        booking = bookingRepository.save(booking);
        return true;
    }
}
