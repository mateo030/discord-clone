export type RegisterFormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
};

export type LoginFormData = {
  email: string;
  password: string;
};

export type VerifyFormData = {
  email: string;
  verificationCode: string;
};

export type CreateRoomFormData = {
  id: string;
  roomName: string;
};

export type JoinRoomFormData = {
  id: string;
  code: string;
};

export type CreateChannelFormData = {
  roomId: string;
  channelName: string;
};

export type MessageData = {
  channelId: string;
  senderId: string;
  content: string;
};
