package com.discordclone.backend_service.auth;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.discordclone.backend_service.user.User;
import com.discordclone.backend_service.user.UserDto;
import com.discordclone.backend_service.util.JwtUtil;

import jakarta.validation.Valid;

import java.util.Map;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final JwtService jwtService;

    private final AuthService authService;

    private final JwtUtil jwtUtil;

    private static final Logger log = LoggerFactory.getLogger(AuthController.class);

    public AuthController(JwtService jwtService, AuthService authService, JwtUtil jwtUtil) {
        this.jwtService = jwtService;
        this.authService = authService;
        this.jwtUtil = jwtUtil;
    }

    // TODO: Return error message to user after failed register
    @PostMapping("/signup")
    public ResponseEntity<User> register(@Valid @RequestBody SignupRequest request) {
        log.info("Received register request with the email: {}", request.getEmail());
        User registeredUser = authService.register(request);
        return ResponseEntity.ok(registeredUser);
    }
    
    @PostMapping("/signin")
    public ResponseEntity<SigninResponse> authenticate(@RequestBody SigninRequest request) {
        log.info("Received login request with the email: {}", request.getEmail());
        User authenticatedUser = authService.authenticate(request);
        String jwtToken = jwtService.generateToken(authenticatedUser);

        // Construct cookie with jwt token
        ResponseCookie cookie = ResponseCookie.from("token", jwtToken)
            .httpOnly(false)
            .secure(true)
            .path("/")
            .maxAge(15*60)
            .sameSite("Lax")
            .build();

        // Prepare user data
        UserDto userDto = new UserDto(authenticatedUser.getId(), authenticatedUser.getUsername());
        SigninResponse signinResponse = new SigninResponse(userDto, authenticatedUser.getRole());

        log.info("Login successful for user with email: {}", request.getEmail());

        // Return cookie + user data
        return ResponseEntity.ok()
            .header(HttpHeaders.SET_COOKIE, cookie.toString())
            .body(signinResponse);
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyUser(@RequestBody VerifyUserRequest request) {
        try {
            authService.verifyUser(request);
            return ResponseEntity.ok("Account verified successfully");
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @PostMapping("/resend")
    public ResponseEntity<?> resendVerificationCode(@RequestParam String email) {
        try {
            authService.resendVerificationCode(email);
            return ResponseEntity.ok("Verification code sent");
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    // Gets called when the user refreshes
    @GetMapping("/current-user")
    public ResponseEntity<?> verifyUserCookie(@CookieValue(name="token",required=false) String jwt) {
        if (jwt == null || !jwtUtil.validateToken(jwt)) {
            return ResponseEntity.status(401).build();
        }

        UUID userId = jwtService.extractUserId(jwt);
        User user = authService.checkUserById(userId);

        return ResponseEntity.ok(Map.of(
                                        "userId", user.getId(),
                                        "username", user.getUsername()));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        log.info("Logging out...");
        ResponseCookie cookie = ResponseCookie.from("token", "")
            .httpOnly(false)
            .secure(true)
            .path("/")
            .maxAge(0)
            .sameSite("Lax")
            .build();

        return ResponseEntity.ok()
            .header(HttpHeaders.SET_COOKIE, cookie.toString())
            .body("Logged out");
    }
}
