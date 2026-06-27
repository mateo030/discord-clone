package com.discordclone.backend_service.channel;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/channels")
public class ChannelController {
    
    private final ChannelService channelService;

    public ChannelController(ChannelService channelService) {
        this.channelService = channelService;
    }

    @PostMapping
    public ResponseEntity<ChannelResponseDto> createChannel(@RequestBody ChannelRequestDto req) {
        return ResponseEntity.ok(channelService.createChannel(req));
    }

    @GetMapping
    public ResponseEntity<List<ChannelResponseDto>> getChannels(@RequestParam UUID roomId) {
        return ResponseEntity.ok(channelService.getChannels(roomId));
    }
    
}
