package com.discordclone.backend_service.room;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RoomRepository extends JpaRepository<Room, UUID> {

    @Query("SELECT rm.room FROM RoomMember rm WHERE rm.userId = :userId")
    List<Room> findByUserId(UUID userId);

    @Query("SELECT r FROM Room r WHERE r.code = :code AND r.isDeleted = false")
    Optional<Room> findByCode(String code);
}
