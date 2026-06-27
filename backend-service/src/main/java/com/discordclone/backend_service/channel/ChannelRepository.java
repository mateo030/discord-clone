package com.discordclone.backend_service.channel;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

public interface ChannelRepository extends JpaRepository<Channel, UUID> {

    List<Channel> findByRoomId(@Param("userId") UUID roomId);
 }
    