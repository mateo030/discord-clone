package com.discordclone.backend_service.roommember;

import java.time.LocalDateTime;
import java.util.UUID;

public record RoomMemberResponseDto(
    UUID id,
    UUID userId,
    LocalDateTime createdAt,
    UUID createdUserId,
    LocalDateTime updatedAt
) {

}
