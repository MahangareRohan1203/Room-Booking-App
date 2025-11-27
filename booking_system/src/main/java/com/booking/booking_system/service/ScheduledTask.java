package com.booking.booking_system.service;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.time.ZoneId;

@Component
public class ScheduledTask {
    
    private final RestTemplate restTemplate = new RestTemplate();
    
    // Runs every 13 minutes
    @Scheduled(cron = "0 */13 * * * *")
    public void callEndpoint() {
        String url = "https://booking-system-latest.onrender.com/";
        try {
            String response = restTemplate.getForObject(url, String.class);
            System.out.println("Scheduled call success: at" + LocalDateTime.now(ZoneId.of("Asia/Kolkata")));
        } catch (Exception e) {
            System.err.println("Scheduled call failed: " + e.getMessage());
        }
    }
}
