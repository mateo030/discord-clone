import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Chatroom } from "../../components/Chatroom";
import { SideBar } from "../../components/SideBar";
import { useAuth } from "../../context/authContext";

import { roomAPI } from "@/api/roomAPI";
import { useInitialize } from "@/hooks/useInitialize";

import "./style.css";

export const Dash: React.FC = () => {
  const [createRoomFormData, setCreateRoomFormData] = useState({
    roomName: "",
  });

  const [roomJoinFormData, setRoomJoinFormData] = useState({
    roomCode: "",
  });

  const { logout } = useAuth();
  const navigate = useNavigate();

  const {
    initData,
    selectedChannelName,
    isLoading,
    setSelectedRoomId,
    setSelectedChannelId,
    setSelectedChannelName,
  } = useInitialize();

  console.log("Init data: ", initData);

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
      ownerId: "test", // TODO: Remove "test", replace with real user id
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

  const handleRoomJoinFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setRoomJoinFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleRoomJoin = async () => {
    const params = {
      roomCode: roomJoinFormData.roomCode,
    };
    console.log("click");
    try {
      const joinResponse = await roomAPI.post(false, params);
      console.log("Room joined: ", joinResponse);
      // Optionally, you can refresh the room list or navigate to the new room
    } catch (error) {
      console.error("Error creating room: ", error);
    }
  };

  console.log(initData);

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
          onRoomJoinFormChange={handleRoomJoinFormChange}
          onCreateRoom={handleCreateRoom}
          onCreateRoomFormChange={handleCreateRoomFormChange}
        />
        <Chatroom
          selectedChannelName={selectedChannelName}
          messageList={initData.message}
        />
      </div>
    );
  }
};
