package E_Commerce.backend.utils;


import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {
    private final String Secret = "Consistent is the main key to success";
    private final long Expiration = 1000 * 60 * 60;
    private final Key SecretKey = Keys.hmacShaKeyFor(Secret.getBytes(StandardCharsets.UTF_8));

    //This function is mainly for creating tokens from the email and confirm with the owner with secret key

    public String generateToken(String email)
    {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + Expiration))
                .signWith(SecretKey, SignatureAlgorithm.HS256)
                .compact();
    }

    //This function validates the token which was generate from the above function And also use error handling
    public String extractEmail(String token)
    {
        return Jwts.parserBuilder()
                .setSigningKey(SecretKey)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
    public boolean validateJwt(String token)
    {
        try
        {
            extractEmail(token);
            return true;
        }
        catch(JwtException exception)
        {
            return false;
        }
    }
}

