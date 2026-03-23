import type { Message } from "../types/api";

import { api } from "./configs/axiosConfigs";
import { defineCancelApiObject } from "./configs/axiosUtils";

// TODO: Change return type to ApiResponse when implementing backend
export const messageAPI = {
  get: async function (params: string, cancel = false): Promise<Message[]> {
    try {
      const response = await api.request<Message[]>({
        url: `/messages/?channel_id=${params}`,
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

const cancelApiObject = defineCancelApiObject(messageAPI);
