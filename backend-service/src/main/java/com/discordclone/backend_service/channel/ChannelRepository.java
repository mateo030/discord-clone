package com.discordclone.backend_service.channel;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ChannelRepository extends JpaRepository<Channel, UUID> {

    @Query(
        value = "SELECT id, roomId, channelName, isDm, createdAt, createdUserId, updatedAt, updatedUserId, isDeleted FROM channels JOIN channelMembers ON channel.id = channelMembers.channelId WHERE channelMembers.userId = :userId",
        nativeQuery = true
    )
    List<Channel> findByUserId(@Param("userId") UUID userId);
 }
    