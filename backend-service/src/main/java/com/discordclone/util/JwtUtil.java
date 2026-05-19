package com.discordclone.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import java.util.Date;
import java.util.Map;

import javax.crypto.SecretKey;

public class JwtUtil {
    
    private final String SECRET_KEY = "mysecretkey"; // TODO: In production, use a secure key and store it safely
    private final long EXPIRATION_TIME = 1000 * 60 * 60; // 1 hour

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    public String generateToken(String username, Map<String, Object> extraClaims) {
        return Jwts.builder()
                .header().add("typ", "JWT").and()
                .claims(extraClaims)
                .subject(username)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(getSigningKey())
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
