package com.discordclone.backend_service.channel;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.discordclone.backend_service.exception.ResourceNotFoundException;
import com.discordclone.backend_service.room.Room;
import com.discordclone.backend_service.room.RoomRepository;

@Service
public class ChannelService {
    
    private final ChannelRepository channelRepository;
    private final RoomRepository roomRepository;
    
    public ChannelService(ChannelRepository channelRepository, RoomRepository roomRepository) {
        this.channelRepository = channelRepository;
        this.roomRepository = roomRepository;
    }

    // MEMO: @ControllerAdvice for custom error messages?

    public ChannelResponseDto createChannel(ChannelRequestDto request) {
        Channel channel = new Channel();

        Room room = roomRepository.findById(request.roomId())
            .orElseThrow(() -> new ResourceNotFoundException("Channel not found"));
        channel.setRoom(room);
        channel.setChannelName(request.channelName());
        channel.setIsDm(false);

        Channel savedChannel = channelRepository.save(channel);
        
        return new ChannelResponseDto(
            savedChannel.getId(),
            room.getId(),
            savedChannel.getChannelName(),
            savedChannel.getIsDm(),
            savedChannel.getCreatedAt()
        );
    }

    public List<ChannelResponseDto> getChannels(UUID RoomId) {
        return channelRepository.findByRoomId(RoomId).stream()
            .map(channel -> new ChannelResponseDto(
                channel.getId(),
                channel.getRoom().getId(),
                channel.getChannelName(),
                channel.getIsDm(),
                channel.getCreatedAt()
            ))
            .toList();
    }

}
