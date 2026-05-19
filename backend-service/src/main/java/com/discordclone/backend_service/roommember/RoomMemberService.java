package com.discordclone.backend_service.roommember;

import org.springframework.stereotype.Service;

import com.discordclone.backend_service.room.RoomRepository;

@Service
public class RoomMemberService {
    
    private final RoomMemberRepository roomMemberRepository;

    private final RoomRepository roomRepository;

    public RoomMemberService(RoomMemberRepository roomMemberRepository, RoomRepository roomRepository) {
        this.roomMemberRepository = roomMemberRepository;
        this.roomRepository = roomRepository;
    }

    public RoomMemberResponseDto createMember(RoomMemberRequestDto request) {
        this.roomRepository.findByCode(request.code())
            .orElseThrow(() -> new IllegalArgumentException("Room with code " + request.code() + " not found."));
        RoomMember roomMember = new RoomMember();
        roomMember.setUserId(request.userId());
        RoomMember savedRoomMember = this.roomMemberRepository.save(roomMember);
        return new RoomMemberResponseDto(
            savedRoomMember.getId(),
            savedRoomMember.getUserId(),
            savedRoomMember.getCreatedAt(),
            savedRoomMember.getCreatedUserId(),
            savedRoomMember.getUpdatedAt()
        );
    }
}
