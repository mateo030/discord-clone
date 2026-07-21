import { useState, useEffect } from "react";

import { channelAPI } from "@/api/channelAPI";
// import { messageAPI } from "@/api/messageAPI";
import { roomAPI } from "@/api/roomAPI";
import { useAuth } from "@/context/authContext";
import type { InitData } from "@/types/api";

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

  useEffect(() => {
    let ignore = false;

    async function fetchDashboardData() {
      if (!user) return;
      setIsLoading(true);
      console.log("user: ", user);
      console.log("useInit userId: ", user.userId);
      try {
        const roomResponse = await roomAPI.get(false, user.id);
        if (!roomResponse) throw new Error("Failed to fetch room");
        const roomData = roomResponse;
        setSelectedRoomId(roomData[0].id);
        console.log(roomData[0].id);

        const channelResponse = await channelAPI.get(roomData[0].id);
        if (!channelResponse) throw new Error("Failed to fetch channel");
        const channelData = channelResponse;
        setSelectedChannelId(channelData[0].id);

        // const messageResponse = await messageAPI.get(channelData[0].id);
        // if (!messageResponse) throw new Error("Failed to fetch messages");
        // const messageData = messageResponse;

        if (!ignore) {
          setInitData({
            room: roomData,
            channel: channelData,
          });
        }
      } catch (error) {
        if (!ignore) {
          console.error(error);
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }
    fetchDashboardData();
    return () => {
      ignore = true;
    };
  }, [user]);

  return {
    initData,
    // dmChannel,
    selectedChannelName,
    isLoading,
    setSelectedRoomId,
    setSelectedChannelId,
    setSelectedChannelName,
  };
};
