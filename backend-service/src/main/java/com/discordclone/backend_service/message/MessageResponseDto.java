package com.discordclone.backend_service.message;

import java.time.LocalDateTime;
import java.util.UUID;

public record MessageResponseDto(
    UUID id,
    String senderName,
    String content,
    LocalDateTime createdAt,
    UUID createdUserId,
    UUID channelId
) {}
