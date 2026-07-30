import type { Channel } from "../types/api";

import { privateApi } from "./configs/axiosConfigs";
import { defineCancelApiObject } from "./configs/axiosUtils";

// TODO: Change return type to ApiResponse when implementing backend
export const channelAPI = {
  get: async function (params: string, cancel = false): Promise<Channel[]> {
    try {
      const response = await privateApi.get<Channel[]>("/channels", {
        params: { roomId: params },
        signal: cancel
          ? cancelApiObject[this.get.name].handleRequestCancellation().signal
          : undefined,
      });
      return response.data;
      console.log("Channel API GET Response: ", response.data);
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  },

  getDm: async function (cancel = false): Promise<Channel[]> {
    try {
      const response = await privateApi.get<Channel[]>("/channels", {
        params: { isDm: true },
        signal: cancel
          ? cancelApiObject[this.get.name].handleRequestCancellation().signal
          : undefined,
      });
      return response.data;
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  },

  post: async function (params: any, cancel = false): Promise<Channel[]> {
    try {
      const response = await privateApi.request<Channel[]>({
        url: "/channels",
        method: "POST",
        data: params,
        signal: cancel
          ? cancelApiObject[this.get.name].handleRequestCancellation().signal
          : undefined,
      });
      console.log("params: ", params);
      console.log("Channel API POST Response: ", response.data);
      return response.data;
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  },
};

const cancelApiObject = defineCancelApiObject(channelAPI);
