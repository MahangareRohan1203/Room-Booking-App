package com.booking.booking_system.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "customer")
@Getter
@Setter
public class Customer {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long customerId;
    
    private String name;
    
    @Column(name = "mobile_number")
    private String mobileNumber;
    
}
