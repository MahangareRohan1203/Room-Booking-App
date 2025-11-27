package com.booking.booking_system.repository;

import com.booking.booking_system.entity.Bookings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Bookings, Long> {
    @Query(value = """
                SELECT b FROM Bookings b
                WHERE b.isDeleted = false
                AND b.fromDate <= :toDate
                AND b.toDate >= :fromDate
                ORDER BY b.bedId
            """)
    List<Bookings> findByDateOverlap(
            @Param("fromDate") LocalDateTime fromDate,
            @Param("toDate") LocalDateTime toDate);
    
    // below is not as per expected result
    @Query("""
                SELECT b FROM Bookings b
                WHERE b.isDeleted = false
                AND b.fromDate <= :toDate
                AND b.toDate >= :fromDate
                AND b.bedId IN :bedIds
                ORDER BY b.bedId
            """)
    List<Bookings> findByDateOverlapAndBed(
            @Param("fromDate") LocalDateTime fromDate,
            @Param("toDate") LocalDateTime toDate,
            @Param("bedIds") List<Long> bedIds);
    
    @Query("""
                SELECT b FROM Bookings b
                WHERE b.bedId = :bedId
                AND b.isDeleted = false
                ORDER BY b.bookingId DESC
                LIMIT 100
            """)
    List<Bookings> findByBedId(@Param("bedId") Long bedId);
    
}
