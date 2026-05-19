package com.discordclone.backend_service.auth;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.support.TransactionSynchronization;
import org.springframework.transaction.support.TransactionSynchronizationManager;

import com.discordclone.backend_service.email.EmailService;
import com.discordclone.backend_service.user.User;
import com.discordclone.backend_service.user.UserRepository;

import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    private final EmailService emailService;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager,
                       EmailService emailService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.emailService = emailService;
    }

    // TODO: Use responseDTO so sensitive data won't be seen
    @Transactional
    public User register(SignupRequest request) {
        User user = new User(request.getUsername(), request.getEmail(), passwordEncoder.encode(request.getPassword()), request.getRole());
        System.out.println("USER ADDRESS: " + request.getEmail());
        user.setVerificationCode(generateVerificationCode());
        user.setVerificationExpiresDatetime(LocalDateTime.now().plusMinutes(15));
        user.setEnabled(false);
        User savedUser = userRepository.save(user);
        TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
            @Override
            public void afterCommit() {
                sendVerificationEmail(user);
            }
        });
        return savedUser;
    }

    public User authenticate(SigninRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new RuntimeException("User not found!"));
        
        if (!user.isEnabled()) {
            throw new RuntimeException("Account not verified, Please verify your account");
        }
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        return user;
    }

    public void verifyUser(VerifyUserRequest request) {
        Optional<User> optionalUser = userRepository.findByEmail(request.getEmail());
        System.out.println(request.getVerificationCode());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.getVerificationExpiresDatetime().isBefore(LocalDateTime.now())) {
                throw new RuntimeException("Verification code has expired!");
            }
            if (user.getVerificationCode().equals(request.getVerificationCode())) {
                user.setEnabled(true);
                user.setVerificationCode(null);
                user.setVerificationExpiresDatetime(null);
                userRepository.save(user);
            } else {
                throw new RuntimeException("Invalid verification code!");
            }
        } else {
            throw new RuntimeException("User not found!");
        }
    }

    public void resendVerificationCode(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.isEnabled()) {
                throw new RuntimeException("Account is already verified");
            }
            user.setVerificationCode(generateVerificationCode());
            user.setVerificationExpiresDatetime(LocalDateTime.now().plusHours(1));
            sendVerificationEmail(user);
            userRepository.save(user);
        } else {
            throw new RuntimeException("User not found!");
        }
    }
    
    public void sendVerificationEmail(User user) {
        String subject = "Account Verification";
        String verificationCode = user.getVerificationCode();
        String htmlMessage = "<html><h1>Verification Code:</h1>" + verificationCode + "</html>";
        try {
            emailService.sendVerificationEmail(user.getEmail(), subject, htmlMessage);
        } catch (MessagingException ex) {
            ex.printStackTrace();
        }
    }

    private String generateVerificationCode() {
        Random random = new Random();
        int code = random.nextInt(900000) + 100000;
        return String.valueOf(code);
    }
}
