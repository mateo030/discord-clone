package com.discordclone.backend_service.room;

import java.time.LocalDateTime;
import java.util.UUID;

public record RoomResponseDto(
    String code,
    String roomName,
    LocalDateTime createdAt,
    UUID createdUserId,
    LocalDateTime updatedAt,
    UUID updatedUserId
) {}
