package com.discordclone.backend_service.channel;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/channels")
public class ChannelController {
    
    private final ChannelService channelService;

    public ChannelController(ChannelService channelService) {
        this.channelService = channelService;
    }
    // TODO: Uncomment this later
    // @PostMapping
    // public ResponseEntity<ChannelResponseDto> createChannel(@RequestBody ChannelRequestDto channel) {
    //     return channelService.createChannel(channel);
    // }

    @GetMapping()
    public List<Channel> getChannels(@RequestParam UUID userId) {
        return channelService.getChannels(userId);
    }
    
}
