package com.discordclone.backend_service.auth;

import com.discordclone.backend_service.user.UserDto;

public record SigninResponse(
    UserDto user,
    String role
)
{}
