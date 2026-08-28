package com.discordclone.backend_service.message;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
@RequestMapping("/api/messages")
public class MessageController {

    private final MessageService messageService;
    
    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    // Maps to "/app/chat" destination sent by client
    @MessageMapping("/chat")
    // Broadcast return value to client
    @SendTo("/topic/messages")
    public MessageResponseDto createMessage(@Valid @RequestBody MessageRequestDto req) {
        MessageResponseDto messageResponse = messageService.createMessage(req);
        return messageResponse; 
    }

    @GetMapping
    public ResponseEntity<List<MessageResponseDto>> getMessages(@Valid @RequestParam String channelId) {
        UUID uuid = UUID.fromString(channelId);
        List<MessageResponseDto> messageResponse = messageService.getMessages(uuid);
        if (messageResponse.size() == 0) {
            return ResponseEntity.status(HttpStatus.OK).body(messageResponse);
        }
        return ResponseEntity.status(HttpStatus.OK).body(messageResponse);
    }
    
}
