package com.discordclone.backend_service.channel;

import java.time.LocalDateTime;
import java.util.UUID;

public record ChannelResponseDto(
    UUID channelId,
    UUID roomId,
    String channelName,
    boolean isDm,
    LocalDateTime createdAt
) {}
