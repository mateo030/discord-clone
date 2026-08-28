package com.discordclone.backend_service.message;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.discordclone.backend_service.channel.Channel;
import com.discordclone.backend_service.channel.ChannelRepository;
import com.discordclone.backend_service.exception.ResourceNotFoundException;
import com.discordclone.backend_service.user.User;
import com.discordclone.backend_service.user.UserRepository;

@Service
public class MessageService {

    private final MessageRepository messageRepository;
    private final ChannelRepository channelRepository;
    private final UserRepository userRepository;

    public MessageService(MessageRepository messageRepository, ChannelRepository channelRepository, UserRepository userRepository) {
        this.messageRepository = messageRepository;
        this.channelRepository = channelRepository;
        this.userRepository = userRepository;
    }

    public MessageResponseDto createMessage(MessageRequestDto req) {
        Message message = new Message();

        Channel channel = channelRepository.findById(req.channelId())
            .orElseThrow(() -> new ResourceNotFoundException("Channel not found"));
        
        User user = userRepository.findById(req.senderId())
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        message.setChannel(channel);
        message.setUser(user);
        message.setContent(req.content());
        message.setCreatedUserId(req.senderId());
        message.setUpdatedUserId(req.senderId());

        Message savedMessage = messageRepository.save(message);
        return new MessageResponseDto(
            savedMessage.getId(),
            user.getUsername(),
            savedMessage.getContent(),
            savedMessage.getCreatedAt(),
            savedMessage.getCreatedUserId(),
            req.channelId()
        );
    }

    public List<MessageResponseDto> getMessages(UUID channelId) {
        return messageRepository.findByChannelId(channelId).stream()
            .map(message -> new MessageResponseDto(
                message.getId(),
                message.getUser().getUsername(),
                message.getContent(),
                message.getCreatedAt(),
                message.getCreatedUserId(),
                message.getChannel().getId()
            ))
            .toList();
    }
}
