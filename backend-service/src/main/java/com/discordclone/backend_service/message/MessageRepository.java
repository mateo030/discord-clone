package com.discordclone.backend_service.message;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

public interface MessageRepository extends JpaRepository<Message, UUID>{
    List<Message> findByChannelId(@Param("channelId") UUID channelId);
}
