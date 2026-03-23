import type { Room } from "../types/api";

import { api } from "./configs/axiosConfigs";
import { defineCancelApiObject } from "./configs/axiosUtils";

// TODO: Change return type to ApiResponse when implementing backend
export const roomAPI = {
  get: async function (cancel = false): Promise<Room[]> {
    try {
      const response = await api.request<Room[]>({
        url: "/rooms",
        method: "GET",
        signal: cancel
          ? cancelApiObject[this.get.name].handleRequestCancellation().signal
          : undefined,
      });
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  },
};

const cancelApiObject = defineCancelApiObject(roomAPI);
