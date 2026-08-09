import { useQuery } from "@tanstack/react-query";

import { channelAPI } from "@/api/channelAPI";
import { messageAPI } from "@/api/messageAPI";
import { roomAPI } from "@/api/roomAPI";
import { useAuth } from "@/context/authContext";

export const useInitialize = (
  roomId: string | null,
  channelId: string | null,
) => {
  const { user } = useAuth();

  const roomQuery = useQuery({
    queryKey: ["rooms", user?.id],
    enabled: !!user?.id,
    queryFn: () => roomAPI.get(false, user!.id),
  });

  const channelQuery = useQuery({
    queryKey: ["channels", roomId],
    enabled: !!roomId,
    queryFn: () => channelAPI.get(roomId!),
  });

  const messageQuery = useQuery({
    queryKey: ["messages", channelId],
    enabled: !!channelId,
    queryFn: () => messageAPI.get(channelId!),
  });

  return {
    rooms: roomQuery.data ?? [],
    channels: channelQuery.data ?? [],
    messages: messageQuery.data ?? [],
    roomQuery,
    channelQuery,
    messageQuery,
  };
};
