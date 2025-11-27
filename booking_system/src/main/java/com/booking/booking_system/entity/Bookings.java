package com.booking.booking_system.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
public class Bookings extends BaseEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;
    
    @Column(name = "from_date")
    private LocalDateTime fromDate;
    
    @Column(name = "to_date")
    private LocalDateTime toDate;
    
    @Column(name = "is_deleted")
    private Boolean isDeleted = false;
    
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;
    
    private Long bedId;
    
    
}
