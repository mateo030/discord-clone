export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export interface InitData {
  room: Room[];
  channel: Channel[];
  // message: Message[];
}

export interface Room {
  id: string;
  owner_id: string;
  code: string;
  room_name: string;
  created_at: string;
  created_user: string;
  updated_at: string;
  updated_user: string;
  delete_flag: boolean;
}

export interface RoomMember {
  id: string;
  user_id: string;
  room_id: string;
  created_at: string;
  created_user: string;
  updated_at: string;
  updated_user: string;
  delete_flag: boolean;
}

export interface Channel {
  id: string;
  room_id: string;
  channel_name: string;
  is_dm: boolean;
  room_name: string;
  created_at: string;
  created_user: string;
  updated_at: string;
  updated_user: string;
  delete_flag: boolean;
}

export interface Message {
  id: string;
  channel_id: string;
  user_id: string;
  content: string;
  created_at: string;
  created_user: string;
  updated_at: string;
  updated_user: string;
  delete_flag: boolean;
}

export interface User {
  id: string;
  username: string;
}

export interface LoginResponse {
  user: User;
  role: string;
}
