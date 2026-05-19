package com.discordclone.backend_service.roommember;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomMemberRepository extends JpaRepository<RoomMember, UUID>{

}
