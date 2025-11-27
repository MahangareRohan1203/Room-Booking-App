package com.booking.booking_system;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableJpaAuditing
@SpringBootApplication
@EnableScheduling
public class BookingSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(BookingSystemApplication.class, args);
		System.out.println("----------------------- APPLICATION STARTED ----------------------------");
	}

}
