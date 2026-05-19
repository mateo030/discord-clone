package com.discordclone.backend_service.roommember;

import java.util.UUID;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record RoomMemberRequestDto(

    @NotNull(message = "User id must not be null.")
    UUID userId,

    @NotNull(message = "Code must not be null.")
    @Size(min = 6, max = 6, message = "Code must be 6 characters.")
    String code

) {}
