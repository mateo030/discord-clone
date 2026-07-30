import type { RoomMember } from "../types/api";

import { privateApi } from "./configs/axiosConfigs";
import { defineCancelApiObject } from "./configs/axiosUtils";

// TODO: Change return type to ApiResponse when implementing backend
export const roomMemberAPI = {
  post: async function (cancel = false, params: any): Promise<RoomMember[]> {
    try {
      const response = await privateApi.request<RoomMember[]>({
        url: "/room-members",
        method: "POST",
        data: params,
        signal: cancel
          ? cancelApiObject[this.post.name].handleRequestCancellation().signal
          : undefined,
      });
      return response.data;
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  },
};

const cancelApiObject = defineCancelApiObject(roomMemberAPI);
