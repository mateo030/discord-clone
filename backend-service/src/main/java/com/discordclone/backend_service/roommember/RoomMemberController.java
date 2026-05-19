package com.discordclone.backend_service.roommember;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/room-members")
public class RoomMemberController {

    public RoomMemberService roomMemberService;
    
    public RoomMemberController(RoomMemberService roomMemberService) {
        this.roomMemberService = roomMemberService;
    }

    @PostMapping
    public ResponseEntity<RoomMemberResponseDto> createMember(@RequestBody RoomMemberRequestDto request) {
        return ResponseEntity.ok(this.roomMemberService.createMember(request));
    }
    
}
