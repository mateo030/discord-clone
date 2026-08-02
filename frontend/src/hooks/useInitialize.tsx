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

  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  console.log("Selected Room Id: ", selectedRoomId);
  console.log("Selected Channel Id: ", selectedChannelId);
  console.log(initData);

  useEffect(() => {
    async function fetchRoomData() {
      if (!user) return;
      setIsLoading(true);
      try {
        const roomData = await roomAPI.get(false, user.id);
        if (!roomData || roomData.length === 0) return;

        setInitData((prev) => ({
          ...prev,
          room: roomData,
        }));
        setSelectedRoomId((prev) => prev || roomData[0].id);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchRoomData();
    return;
  }, [user]);

  useEffect(() => {
    if (!selectedRoomId) return;

    async function fetchChannelData() {
      setIsLoading(true);
      try {
        const channelData = await channelAPI.get(selectedRoomId);
        if (!channelData || channelData.length === 0) {
          setInitData((prev) => ({
            ...prev,
            channel: [],
          }));
          setSelectedChannelId("");
          setSelectedChannelName("");
          return;
        }

        setInitData((prev) => ({
          ...prev,
          channel: channelData,
        }));
        setSelectedChannelId(channelData[0].id);
        setSelectedChannelName(channelData[0].channelName);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchChannelData();
  }, [selectedRoomId]);

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
