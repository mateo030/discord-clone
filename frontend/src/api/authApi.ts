import type { User } from "../types/api";

import { api } from "./configs/axiosConfigs";
import { defineCancelApiObject } from "./configs/axiosUtils";

// TODO: Change return type to ApiResponse when implementing backend
export const authApi = {
  login: async function (cancel = false, params: any): Promise<User[]> {
    try {
      console.log(params);
      const response = await api.request<User[]>({
        url: `/auth/login`,
        method: "POST",
        data: params,
        signal: cancel
          ? cancelApiObject[this.login.name].handleRequestCancellation().signal
          : undefined,
      });
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  },

  signup: async function (cancel = false, params: any): Promise<User[]> {
    try {
      console.log(params);
      const response = await api.request<User[]>({
        url: `/auth/signup`,
        method: "POST",
        data: params,
        signal: cancel
          ? cancelApiObject[this.login.name].handleRequestCancellation().signal
          : undefined,
      });
      return response.data;
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  },

  verify: async function (cancel = false, params: any): Promise<User[]> {
    try {
      console.log(params);
      const response = await api.request<User[]>({
        url: `/auth/verify`,
        method: "POST",
        data: params,
        signal: cancel
          ? cancelApiObject[this.login.name].handleRequestCancellation().signal
          : undefined,
      });
      return response.data;
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  },
};

const cancelApiObject = defineCancelApiObject(authApi);
