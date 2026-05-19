package com.discordclone.backend_service.room;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.discordclone.backend_service.roommember.RoomMember;
import com.discordclone.backend_service.roommember.RoomMemberRepository;
import com.discordclone.backend_service.user.User;
import com.discordclone.backend_service.user.UserRepository;
import com.discordclone.util.RandomCodeUtil;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class RoomService {
    
    private final UserRepository userRepository;
    private final RoomRepository roomRepository;
    private final RoomMemberRepository roomMemberRepository;

    public RoomService(RoomRepository roomRepository, UserRepository userRepository, RoomMemberRepository roomMemberRepository) {
        this.roomRepository = roomRepository;
        this.userRepository = userRepository;
        this.roomMemberRepository = roomMemberRepository;
    }

    @Transactional
    public RoomResponseDto createRoom(RoomRequestDto request) {
        User roomOwner = userRepository.findById(request.ownerId())
            .orElseThrow(() -> new EntityNotFoundException("Room owner ID not found."));
        Room room = new Room();
        String randomCode = RandomCodeUtil.generateRandomCode(6);
        room.setCode(randomCode);
        room.setOwner(roomOwner);
        room.setRoomName(request.roomName());
        Room savedRoom = roomRepository.save(room);

        RoomMember roomMember = new RoomMember();
        roomMember.setUserId(request.ownerId());
        roomMember.setRoom(savedRoom);
        this.roomMemberRepository.save(roomMember);

        return new RoomResponseDto(
            savedRoom.getCode(), 
            savedRoom.getRoomName(), 
            savedRoom.getCreatedAt(),
            savedRoom.getCreatedUserId(),
            savedRoom.getUpdatedAt(),
            savedRoom.getUpdatedUserId()
        );
    }

    public List<Room> getRoomsByUserId(UUID userId) {
        return roomRepository.findByUserId(userId);
    }

}
