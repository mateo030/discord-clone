import { Client } from "@stomp/stompjs";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import SockJS from "sockjs-client";

import { messageAPI } from "@/api/messageAPI";
import type { Message } from "@/types/api";

// NOTE: ### The code below is mostly made with AI ###

const fetchMessageHistory = async (channelId: string) => {
  const response = await messageAPI.get(channelId);
  return response;
};

export const useChat = (channelId: string) => {
  const queryClient = useQueryClient();
  const clientRef = useRef<Client | null>(null);
  const subscriptionRef = useRef<any>(null);

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ["chatMessages", channelId],
    queryFn: () => fetchMessageHistory(channelId),
    staleTime: Infinity,
  });

  useEffect(() => {
    const newClient = new Client({
      webSocketFactory: () =>
        new SockJS("/ws", null, {
          withCredentials: true,
        } as SockJS.Options),
      onConnect: () => {
        console.log("Client connected");
        // Unsubscribe from previous channel if exists
        if (subscriptionRef.current) {
          subscriptionRef.current.unsubscribe();
        }

        // Subscribe to messages for current channel
        subscriptionRef.current = newClient.subscribe(
          "/topic/messages",
          (message) => {
            const newMessage = JSON.parse(message.body);

            // Only update cache if message is for current channel
            if (newMessage.channelId === channelId) {
              queryClient.setQueryData<Message[]>(
                ["chatMessages", channelId],
                (oldMessages) => {
                  if (!oldMessages) return [newMessage as Message];
                  return [...oldMessages, newMessage as Message];
                },
              );
            }
          },
        );
      },
      onDisconnect: () => {
        console.log("Client disconnected");
      },
    });

    newClient.activate();
    clientRef.current = newClient;

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }
      newClient.deactivate();
    };
  }, [queryClient, channelId]);

  const sendMessage = (params: any) => {
    if (!clientRef.current?.connected) {
      console.error("WebSocket not connected");
      return;
    }
    clientRef.current.publish({
      destination: "/app/chat",
      body: JSON.stringify(params),
    });
  };

  return { messages, isLoading, sendMessage };
};
