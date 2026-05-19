package com.discordclone.backend_service.channel;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

@Service
public class ChannelService {
    
    private final ChannelRepository channelRepository;
    
    public ChannelService(ChannelRepository channelRepository) {
        this.channelRepository = channelRepository;
    }

    public Channel createChannel(Channel channel) {
        return channelRepository.save(channel);
    }

    public List<Channel> getChannels(UUID userId) {
        return channelRepository.findByUserId(userId);
    }

}
