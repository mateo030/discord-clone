package com.discordclone.backend_service.message;

import java.time.LocalDateTime;
import java.util.UUID;

public record MessageResponseDto(
    UUID id,
    UUID channelId,
    UUID senderId,
    String content,
    LocalDateTime createdAt,
    UUID createdUserId
) {}
