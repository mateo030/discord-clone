package com.discordclone.backend_service.user;

import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User createUser(User user) {
        userRepository.save(user);
        return user;
    }
    
}
