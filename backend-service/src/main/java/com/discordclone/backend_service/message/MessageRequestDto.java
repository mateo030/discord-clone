package com.discordclone.backend_service.message;

import java.util.UUID;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record MessageRequestDto(

    @NotNull(message = "Channel ID must not be null")
    UUID channelId,

    @NotNull(message = "Sender ID must not be null")
    UUID senderId,

    @NotNull(message = "Content must not be null")
    @Size(max = 200, message = "Content must be under 200 characters")
    String content
) {}
