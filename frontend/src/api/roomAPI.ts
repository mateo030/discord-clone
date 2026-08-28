import type { Room } from "../types/api";

import { privateApi } from "./configs/axiosConfigs";
import { defineCancelApiObject } from "./configs/axiosUtils";

export const roomAPI = {
  get: async function (cancel = false, id: string): Promise<Room[]> {
    try {
      const response = await privateApi.request<Room[]>({
        url: `/rooms?userId=${id}`,
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

  post: async function (cancel = false, params: any): Promise<Room> {
    try {
      const response = await privateApi.request<Room>({
        url: "/rooms",
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

const cancelApiObject = defineCancelApiObject(roomAPI);
