package com.booking.booking_system.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "home")
@Getter
@Setter
public class Home {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long homeId;
    
    private String name;
    private String description;
    
    @ManyToOne
    @JoinColumn(name = "location_id")
    @JsonBackReference
    private Location location;
    
    @OneToMany(mappedBy = "home", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Bed> beds;
}
