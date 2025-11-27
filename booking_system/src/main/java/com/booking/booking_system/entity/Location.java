package com.booking.booking_system.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "location")
@Getter
@Setter
public class Location {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long locationId;
    
    private String name;
    private String description;
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;
    
    @OneToMany(mappedBy = "location", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Home> homes;
}
