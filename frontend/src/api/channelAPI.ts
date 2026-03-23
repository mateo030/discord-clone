import type { Channel } from "../types/api";

import { api } from "./configs/axiosConfigs";
import { defineCancelApiObject } from "./configs/axiosUtils";

// TODO: Change return type to ApiResponse when implementing backend
export const channelAPI = {
  get: async function (params: string, cancel = false): Promise<Channel[]> {
    try {
      const response = await api.request<Channel[]>({
        url: `/channels/?room_id=${params}`,
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

  getDm: async function (cancel = false): Promise<Channel[]> {
    try {
      const response = await api.request<Channel[]>({
        url: `/channels/?is_dm=true`,
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

const cancelApiObject = defineCancelApiObject(channelAPI);
