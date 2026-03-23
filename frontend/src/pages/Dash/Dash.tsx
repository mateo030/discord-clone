import { useNavigate } from "react-router-dom";

import { Chatroom } from "../../components/Chatroom";
import { SideBar } from "../../components/SideBar";
import { useAuth } from "../../context/authContext";

import { useDashboardData } from "@/hooks/useInitialize";

import "./style.css";

export const Dash: React.FC = () => {
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

  return (
    <div className="content">
      <SideBar
        roomList={roomList}
        channelList={channelList}
        dmChannel={dmChannel}
        handleRoomClick={handleRoomCLick}
        handleChannelClick={handleChannelClick}
        handleLogout={handleLogout}
      />
      <Chatroom
        selectedChannelName={selectedChannelName}
        messageList={messageList}
      />
    </div>
  );
};
