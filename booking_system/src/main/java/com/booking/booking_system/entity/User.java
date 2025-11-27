package com.booking.booking_system.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "users")
public class User { // extend it to BaseEntity
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_id;
    
    @Column(nullable = false, unique = true)
    
    private String username;
    
    @Column(nullable = false)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Location> locations;
    
}
