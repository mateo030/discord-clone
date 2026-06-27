package com.discordclone.backend_service.channel;

import java.util.UUID;

import jakarta.validation.constraints.NotNull;

public record ChannelRequestDto(
    @NotNull UUID roomId,
    @NotNull String channelName
) {}
