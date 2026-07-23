package com.discordclone.backend_service.room;

import java.util.List;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/rooms")
public class RoomController {
    
    private final RoomService roomService;

    private final Logger log = LoggerFactory.getLogger(RoomController.class);

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @PostMapping
    public ResponseEntity<RoomResponseDto> createRoom(@Valid @RequestBody RoomRequestDto request) {
        log.debug("Request ID: {}", request.id());
        System.out.println("Room name: " + request.roomName());
        return ResponseEntity.ok(roomService.createRoom(request));
    }
    
    // TODO: Return Response DTO
    @GetMapping
    public ResponseEntity<?> getRoomsByUserId(@RequestParam String userId) {
        log.debug("Fetching rooms for the userId: {}", userId);
        try {
            UUID uuid = UUID.fromString(userId);
        return ResponseEntity.ok(roomService.getRoomsByUserId(uuid));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid UUID format for roomId.");
        }
        
    }

}
