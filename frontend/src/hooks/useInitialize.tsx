import { useQuery } from "@tanstack/react-query";

import { channelAPI } from "@/api/channelAPI";
import { roomAPI } from "@/api/roomAPI";
import { useAuth } from "@/context/authContext";

export const useInitialize = (roomId: string | null) => {
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

  return {
    rooms: roomQuery.data ?? [],
    channels: channelQuery.data ?? [],
    roomQuery,
    channelQuery,
  };
};
