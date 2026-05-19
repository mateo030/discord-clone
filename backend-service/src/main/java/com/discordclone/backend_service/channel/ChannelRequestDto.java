package com.discordclone.backend_service.channel;

import jakarta.validation.constraints.NotNull;

public record ChannelRequestDto(
    @NotNull String roomId,
    @NotNull String channelName,
    @NotNull boolean isDm
) {}
