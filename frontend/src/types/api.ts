export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export interface InitData {
  room: Room[];
  channel: Channel[];
  message: Message[];
}

export interface Room {
  id: string;
  ownerId: string;
  code: string;
  roomName: string;
  createdAt: string;
  createdUser: string;
  updatedAt: string;
  updatedUser: string;
  deleteFlag: boolean;
}

export interface RoomMember {
  id: string;
  userId: string;
  roomId: string;
  createdAt: string;
  createdUser: string;
  updatedAt: string;
  updatedUser: string;
  deleteFlag: boolean;
}

export interface Channel {
  id: string;
  roomId: string;
  channelName: string;
  isDm: boolean;
  roomName: string;
  createdAt: string;
  createdUser: string;
  updatedAt: string;
  updatedUser: string;
  deleteFlag: boolean;
}

export interface Message {
  id: string;
  senderName: string;
  content: string;
  createdAt: string;
  createdUserId: string;
}

export interface User {
  id: string;
  username: string;
}

export interface LoginResponse {
  user: User;
  role: string;
}
