package com.booking.booking_system.security;

import com.booking.booking_system.exceptions.CustomUnauthorizedException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {
    private final String SECRET_KEY = "alphabetagammadeltacharliemikechinuandallhappyilyliving";
    
    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 + 3)) // 1 hour
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }
    
    public String extractUsername(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody().getSubject();
    }
    
    public Boolean validateToken(String token, String username) {
        if(isTokenExpired(token)) throw new CustomUnauthorizedException("Session Expired. Log in again");
        return extractUsername(token).equals(username) && !isTokenExpired(token);
    }
    
    
    private Boolean isTokenExpired(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody().getExpiration().before(new Date());
    }
    
    public String isValidToken(String token) {
        try {
            // Extract token from Authorization header
            String jwtToken = token.startsWith("Bearer ") ? token.substring(7) : token;
            // Validate the token
            if (validateToken(jwtToken, extractUsername(jwtToken))) {
                return extractUsername(jwtToken);
            } else {
                // If invalid, return Unauthorized error
                throw new CustomUnauthorizedException("INVALID TOKEN or EXPIRED");
            }
        } catch (Exception e) {
            // Handle exceptions like invalid token format or missing token
            throw new CustomUnauthorizedException("INVALID TOKEN");
        }
    }
}
