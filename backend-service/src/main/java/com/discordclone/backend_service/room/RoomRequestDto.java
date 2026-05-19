package com.discordclone.backend_service.room;

import java.util.UUID;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record RoomRequestDto(

    @NotNull(message = "Owner id must not be null.")
    UUID ownerId,

    @NotBlank(message = "Room name must not be null.")
    @Size(max = 6, message = "Room name must be above 6 characters.")
    String roomName

) {}
