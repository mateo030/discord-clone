package com.discordclone.backend_service.auth;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.discordclone.backend_service.user.User;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final JwtService jwtService;

    private final AuthService authService;

    public AuthController(JwtService jwtService, AuthService authService) {
        this.jwtService = jwtService;
        this.authService = authService;
    }

    // TODO: Return error message to user after failed register
    @PostMapping("/signup")
    public ResponseEntity<User> register(@Valid @RequestBody SignupRequest request) {
        User registeredUser = authService.register(request);
        return ResponseEntity.ok(registeredUser);
    }
    
    @PostMapping("/signin")
    public ResponseEntity<SigninResponse> authenticate(@RequestBody SigninRequest request) {
        System.out.println(request.getEmail());
        System.out.println(request.getPassword());
        User authenticatedUser = authService.authenticate(request);
        String jwtToken = jwtService.generateToken(authenticatedUser);
        SigninResponse signinResponse = new SigninResponse(jwtToken, jwtService.getExpirationTime());
        return ResponseEntity.ok(signinResponse);
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyUser (@RequestBody VerifyUserRequest request) {
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
}
