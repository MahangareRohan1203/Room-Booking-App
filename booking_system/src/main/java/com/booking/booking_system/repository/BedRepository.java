package com.booking.booking_system.repository;

import com.booking.booking_system.entity.Bed;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BedRepository extends JpaRepository<Bed, Long> {

}
