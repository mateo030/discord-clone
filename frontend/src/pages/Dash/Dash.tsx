import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Chatroom } from "../../components/Chatroom";
import { SideBar } from "../../components/SideBar";
import { useAuth } from "../../context/authContext";

import { roomAPI } from "@/api/roomAPI";
import { useDashboardData } from "@/hooks/useInitialize";

import "./style.css";

export const Dash: React.FC = () => {
  const [createRoomFormData, setCreateRoomFormData] = useState({
    roomName: "",
  });

  const { logout } = useAuth();
  const navigate = useNavigate();

  const {
    roomList,
    channelList,
    messageList,
    dmChannel,
    selectedChannelName,
    setSelectedRoomId,
    setSelectedChannelId,
    setSelectedChannelName,
  } = useDashboardData();

  const handleRoomCLick = (roomId: string) => {
    setSelectedRoomId(roomId);
  };

  const handleChannelClick = (channelId: string, channelName: string) => {
    setSelectedChannelId(channelId);
    setSelectedChannelName(channelName);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleCreateRoomFormChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { id, value } = e.target;
    setCreateRoomFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleCreateRoom = async () => {
    const params = {
      ownerId: "test",
      roomName: createRoomFormData.roomName,
    };

    try {
      const newRoom = await roomAPI.post(false, params);
      console.log("Room created: ", newRoom);
      // Optionally, you can refresh the room list or navigate to the new room
    } catch (error) {
      console.error("Error creating room: ", error);
    }
  };

  return (
    <div className="content">
      <SideBar
        roomList={roomList}
        channelList={channelList}
        dmChannel={dmChannel}
        onRoomClick={handleRoomCLick}
        onChannelClick={handleChannelClick}
        handleLogout={handleLogout}
        onCreateRoom={handleCreateRoom}
        onCreateRoomFormChange={handleCreateRoomFormChange}
      />
      <Chatroom
        selectedChannelName={selectedChannelName}
        messageList={messageList}
      />
    </div>
  );
};
