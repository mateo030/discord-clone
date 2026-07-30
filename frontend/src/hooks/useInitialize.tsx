import { useState, useEffect } from "react";

import { channelAPI } from "@/api/channelAPI";
// import { messageAPI } from "@/api/messageAPI";
import { roomAPI } from "@/api/roomAPI";
import { useAuth } from "@/context/authContext";
import type { Channel, InitData } from "@/types/api";

export const useInitialize = () => {
  const [initData, setInitData] = useState<InitData>({
    room: [],
    channel: [],
  });
  const [selectedRoomId, setSelectedRoomId] = useState<string>("");
  const [selectedChannelId, setSelectedChannelId] = useState<string>("");
  const [selectedChannelName, setSelectedChannelName] = useState<string>("");
  // const [dmChannel, setDmChannelList] = useState<Channel[]>([]);

  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  console.log("Selected Room Id: ", selectedRoomId);
  console.log("Selected Channel Id: ", selectedChannelId);

  useEffect(() => {
    async function fetchDashboardData() {
      if (!user) return;
      setIsLoading(true);
      try {
        const roomResponse = await roomAPI.get(false, user.id);
        if (!roomResponse || roomResponse.length === 0) {
          return;
        }
        const roomData = roomResponse;
        setSelectedRoomId(roomData[0].id);

        let channelData: Channel[] = [];
        const channelResponse = await channelAPI.get(selectedRoomId);
        if (channelResponse && channelResponse.length > 0) {
          channelData = channelResponse;
          setSelectedChannelId(channelData[0].id);
        }

        // const messageResponse = await messageAPI.get(channelData[0].id);
        // if (!messageResponse) throw new Error("Failed to fetch messages");
        // const messageData = messageResponse;

        setInitData({
          room: roomData,
          channel: channelData,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDashboardData();
    return;
  }, [user, selectedRoomId, selectedChannelId]);

  return {
    initData,
    // dmChannel,
    selectedRoomId,
    selectedChannelId,
    selectedChannelName,
    isLoading,
    setSelectedRoomId,
    setSelectedChannelId,
    setSelectedChannelName,
  };
};
