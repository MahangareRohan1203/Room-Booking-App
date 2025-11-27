package com.booking.booking_system.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "bed")
@Getter
@Setter
public class Bed {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bedId;
    
    private String name;
    private String description;
    
    @ManyToOne
    @JoinColumn(name = "home_id")
    @JsonBackReference
    private Home home;
    
}
