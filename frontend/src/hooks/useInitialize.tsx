import { useState, useEffect } from "react";

import { channelAPI } from "@/api/channelAPI";
import { messageAPI } from "@/api/messageAPI";
import { roomAPI } from "@/api/roomAPI";
import type { Room, Channel, Message } from "@/types/api";

export const useDashboardData = () => {
  const [roomList, setRoomList] = useState<Room[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState<string>("");
  const [channelList, setChannelList] = useState<Channel[]>([]);
  const [selectedChannelId, setSelectedChannelId] = useState<string>("");
  const [selectedChannelName, setSelectedChannelName] = useState<string>("");
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [dmChannel, setDmChannelList] = useState<Channel[]>([]);

  // 1. Fetch Rooms on mount
  useEffect(() => {
    roomAPI.get().then((response) => {
      if (response.length > 0) {
        setRoomList(response);
        setSelectedRoomId(response[0].id);
      }
    });
  }, []);

  // 2. Fetch Channels when room changes
  useEffect(() => {
    if (!selectedRoomId) return;

    channelAPI.get(selectedRoomId).then((response) => {
      setChannelList(response);
      if (response.length > 0) {
        setSelectedChannelId(response[0].id);
        setSelectedChannelName(response[0].channel_name);
      }
    });
  }, [selectedRoomId]);

  // 3. Fetch Messages when channel changes
  useEffect(() => {
    if (!selectedChannelId) return;

    messageAPI.get(selectedChannelId).then((response) => {
      setMessageList(response);
    });
  }, [selectedChannelId]);

  // 4. Fetch DM Channels (Only once or based on relevant updates)
  useEffect(() => {
    channelAPI.getDm().then((response) => {
      setDmChannelList(response);
    });
  }, []); // Changed from selectedChannelId to avoid redundant calls

  return {
    roomList,
    channelList,
    messageList,
    dmChannel,
    selectedChannelName,
    setSelectedRoomId,
    setSelectedChannelId,
    setSelectedChannelName,
  };
};
