package com.discordclone.backend_service.room;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/rooms")
public class RoomController {
    
    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @PostMapping
    public ResponseEntity<RoomResponseDto> createRoom(@RequestBody RoomRequestDto entity) {
        return ResponseEntity.ok(roomService.createRoom(entity));
    }
    

    @GetMapping
    public ResponseEntity<List<Room>> getRoomsByUserId(@RequestParam UUID userId) {
        return ResponseEntity.ok(roomService.getRoomsByUserId(userId));
    }

}
