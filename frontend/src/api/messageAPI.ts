import type { Message } from "../types/api";

import { privateApi } from "./configs/axiosConfigs";
import { defineCancelApiObject } from "./configs/axiosUtils";

export const messageAPI = {
  get: async function (params: string, cancel = false): Promise<Message[]> {
    try {
      const response = await privateApi.get<Message[]>("/messages", {
        params: { channelId: params },
        method: "GET",
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

  post: async function (cancel = false, params: any): Promise<Message[]> {
    try {
      const response = await privateApi.request<Message[]>({
        url: "/messages",
        method: "POST",
        data: params,
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
};

const cancelApiObject = defineCancelApiObject(messageAPI);
