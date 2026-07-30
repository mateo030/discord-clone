import type { User, LoginResponse } from "../types/api";

import { publicApi, privateApi } from "./configs/axiosConfigs";
import { defineCancelApiObject } from "./configs/axiosUtils";

export const authApi = {
  login: async function (cancel = false, params: any): Promise<LoginResponse> {
    try {
      const response = await publicApi.request<LoginResponse>({
        url: `/auth/signin`,
        method: "POST",
        data: params,
        signal: cancel
          ? cancelApiObject[this.login.name].handleRequestCancellation().signal
          : undefined,
        headers: { "Content-Type": "application/json" },
      });

      return response.data;
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  },

  signup: async function (cancel = false, params: any): Promise<User[]> {
    try {
      const response = await publicApi.request<User[]>({
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
      const response = await publicApi.request<User[]>({
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

  logout: async function (cancel = false): Promise<LoginResponse> {
    try {
      const response = await publicApi.request<LoginResponse>({
        url: `/auth/logout`,
        method: "POST",
        signal: cancel
          ? cancelApiObject[this.login.name].handleRequestCancellation().signal
          : undefined,
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  },

  currentUser: async function (cancel = false): Promise<User> {
    try {
      const response = await privateApi.request<User>({
        url: `/auth/current-user`,
        method: "GET",
        signal: cancel
          ? cancelApiObject[this.login.name].handleRequestCancellation().signal
          : undefined,
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  },
};

const cancelApiObject = defineCancelApiObject(authApi);
