import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Chatroom } from "../../components/Chatroom";
import { SideBar } from "../../components/SideBar";
import { useAuth } from "../../context/authContext";

import { channelAPI } from "@/api/channelAPI";
import { roomAPI } from "@/api/roomAPI";
import { roomMemberAPI } from "@/api/roomMemberAPI";
import { useChat } from "@/hooks/useChat";
import { useInitialize } from "@/hooks/useInitialize";
import type {
  CreateChannelFormData,
  CreateRoomFormData,
  JoinRoomFormData,
  MessageData,
} from "@/types/types";

import "./style.css";

export const Dash: React.FC = () => {
  const [selectedRoomId, setSelectedRoomId] = useState<string>("");
  const [selectedChannelId, setSelectedChannelId] = useState<string>("");
  const [selectedChannelName, setSelectedChannelName] = useState<string>("");
  const { rooms, channels } = useInitialize(selectedRoomId);
  const [code, setCode] = useState<string>("");
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { messages, sendMessage } = useChat(selectedChannelId);

  const handleRoomCLick = (roomId: string) => {
    setSelectedRoomId(roomId);
    setSelectedChannelId("");
    setSelectedChannelName("");
  };

  const handleChannelClick = (channelId: string, channelName: string) => {
    setSelectedChannelId(channelId);
    setSelectedChannelName(channelName);
  };

  const createChannelMutation = useMutation({
    mutationFn: (data: CreateChannelFormData) =>
      channelAPI.post(
        { roomId: selectedRoomId, channelName: data.channelName },
        false,
      ),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["channels", selectedRoomId],
      });
      await queryClient.invalidateQueries({ queryKey: ["rooms", user?.id] });
    },
    onError: (error: unknown) => {
      console.error("Channel creation failed: ", error);
    },
  });

  const handleCreateChannel: SubmitHandler<CreateChannelFormData> = async (
    data,
  ) => {
    if (!selectedRoomId) {
      console.error("Please select a room before creating a channel");
      return;
    }

    createChannelMutation.mutate(data);
  };

  const createRoomMutation = useMutation({
    mutationFn: (data: CreateRoomFormData) =>
      roomAPI.post(false, {
        id: user?.id,
        roomName: data.roomName,
      }),
    onSuccess: async (data) => {
      setCode(data.code);
      await queryClient.invalidateQueries({ queryKey: ["rooms", user?.id] });
    },
    onError: (error: unknown) => {
      console.error("Error creating room: ", error);
    },
  });

  const handleCreateRoom: SubmitHandler<CreateRoomFormData> = async (data) => {
    if (user == null) return;

    createRoomMutation.mutate(data);
  };

  const joinMutation = useMutation({
    mutationFn: (payload: JoinRoomFormData & { id: string }) =>
      roomMemberAPI.post(false, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["rooms", user?.id] });
    },
    onError: (error: unknown) => {
      console.error("Room join failed: ", error);
    },
  });

  const handleRoomJoin: SubmitHandler<JoinRoomFormData> = async (data) => {
    if (!user) {
      console.error("Current user doesn't exist! Unable to join server");
      return;
    }

    const payload = {
      id: user.id,
      code: data.code,
    };

    joinMutation.mutate(payload);
  };

  const handleSendMessage: SubmitHandler<MessageData> = async (data) => {
    if (!user) {
      console.error("Current user doesn't exist! Unable to send message");
      return;
    }

    const payload = {
      channelId: selectedChannelId,
      senderId: user.id,
      content: data.content,
    };

    sendMessage(payload);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="content">
      <SideBar
        roomList={rooms}
        channelList={channels}
        onRoomClick={handleRoomCLick}
        onChannelClick={handleChannelClick}
        handleLogout={handleLogout}
        onRoomJoin={handleRoomJoin}
        onRoomSubmit={handleCreateRoom}
        onChannelSubmit={handleCreateChannel}
        code={code}
      />
      <Chatroom
        selectedChannelName={selectedChannelName}
        messageList={messages}
        onMessageSend={handleSendMessage}
      />
    </div>
  );
};
