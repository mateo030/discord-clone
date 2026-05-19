package com.discordclone.backend_service.config;

import java.util.Optional;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.discordclone.backend_service.user.User;

@Component
public class AuditorAwareImpl implements AuditorAware<UUID>{
    
    private static final Logger logger = LoggerFactory.getLogger(AuditorAwareImpl.class);
    
    @Override
    public Optional<UUID> getCurrentAuditor() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        logger.debug("AuditorAwareImpl.getCurrentAuditor() - Authentication: {}", auth);
        
        if (auth == null || !auth.isAuthenticated()) {
            logger.debug("No authenticated user found");
            return Optional.empty();
        }
        
        Object principal = auth.getPrincipal();
        logger.debug("Principal type: {}, value: {}", principal.getClass().getName(), principal);
        
        if (principal instanceof User) {
            User user = (User) principal;
            UUID userId = user.getId();
            logger.debug("Found user ID from principal: {}", userId);
            return Optional.ofNullable(userId);
        } else if (principal instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) principal;
            logger.debug("Principal is UserDetails with username: {}", userDetails.getUsername());
            // If it's a UserDetails but not a User entity, we can't extract the ID
            return Optional.empty();
        }
        
        logger.debug("Principal is not a User or UserDetails");
        return Optional.empty();
    }
}
