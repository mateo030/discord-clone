package com.discordclone.backend_service.user;

import java.util.UUID;

public record UserDto(
    UUID id,
    String username
) {}
