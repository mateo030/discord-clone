import { type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Chatroom } from "../../components/Chatroom";
import { SideBar } from "../../components/SideBar";
import { useAuth } from "../../context/authContext";

import { channelAPI } from "@/api/channelAPI";
import { roomAPI } from "@/api/roomAPI";
import { roomMemberAPI } from "@/api/roomMemberAPI";
import { useInitialize } from "@/hooks/useInitialize";
import type {
  CreateChannelFormData,
  CreateRoomFormData,
  JoinRoomFormData,
} from "@/types/types";

import "./style.css";

export const Dash: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const {
    initData,
    selectedRoomId,
    selectedChannelName,
    isLoading,
    setSelectedRoomId,
    setSelectedChannelId,
    setSelectedChannelName,
  } = useInitialize();

  const { user } = useAuth();

  const handleRoomCLick = (roomId: string) => {
    setSelectedRoomId(roomId);
  };

  const handleChannelClick = (channelId: string, channelName: string) => {
    setSelectedChannelId(channelId);
    setSelectedChannelName(channelName);
  };

  const handleCreateChannel: SubmitHandler<CreateChannelFormData> = async (
    data,
  ) => {
    console.log("Create channel", data);
    try {
      if (!data) return;

      const payload = { roomId: selectedRoomId, channelName: data.channelName };

      const response = channelAPI.post(payload, false);
      console.log("Create channel response: ", response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleCreateRoom: SubmitHandler<CreateRoomFormData> = async (data) => {
    try {
      if (user == null) return;

      const params = {
        roomId: selectedRoomId,
        roomName: data.roomName,
      };

      const newRoomResponse = await roomAPI.post(false, params);
      console.log(newRoomResponse);
      // Optionally, you can refresh the room list or navigate to the new room
    } catch (error) {
      console.error("Error creating room: ", error);
    }
  };

  const handleRoomJoin: SubmitHandler<JoinRoomFormData> = async (data) => {
    try {
      if (user == null) return;

      const params = {
        id: user.id,
        code: data.code,
      };
      const joinResponse = await roomMemberAPI.post(false, params);
      console.log("Room joined: ", joinResponse);
      // Optionally, you can refresh the room list or navigate to the new room
    } catch (error) {
      console.error("Error joining room: ", error);
    }
  };

  if (isLoading) {
    return <h1>Data loading</h1>;
  } else {
    return (
      <div className="content">
        <SideBar
          roomList={initData.room}
          channelList={initData.channel}
          // dmChannel={dmChannel}
          onRoomClick={handleRoomCLick}
          onChannelClick={handleChannelClick}
          handleLogout={handleLogout}
          onRoomJoin={handleRoomJoin}
          onRoomSubmit={handleCreateRoom}
          onChannelSubmit={handleCreateChannel}
        />
        <Chatroom
          selectedChannelName={selectedChannelName}
          messageList={initData.message} // TODO: Implement messaging
        />
      </div>
    );
  }
};
