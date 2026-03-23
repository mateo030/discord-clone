import { useState } from "react";

import { Modal } from "@/components/Modal";
import type { Channel, Room } from "@/types/api";

type SideBarProps = {
  roomList: Room[];
  channelList: Channel[];
  dmChannel: Channel[];
  handleRoomClick(roomId: string): void;
  handleChannelClick(channelId: string, channelName: string): void;
  handleLogout(): void;
};

export const SideBar: React.FC<SideBarProps> = ({
  roomList,
  channelList,
  dmChannel,
  handleRoomClick,
  handleChannelClick,
  handleLogout,
}) => {
  const [isRoomModalOpen, setIsRoomModalOpen] = useState<boolean>(false);
  const [isChannelModalOpen, setIsChannelModalOpen] = useState<boolean>(false);

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1>Slack Clone</h1>
        <h2>←</h2>
      </div>
      <div className="sidebar-group">
        <div className="sidebar-group-header">
          <h3>My Rooms</h3>
          <h3>
            <span role="button" onClick={() => setIsRoomModalOpen(true)}>
              +
            </span>
          </h3>
        </div>
        <ul>
          {roomList.map((room, index) => (
            <li
              role="button"
              key={index}
              onClick={() => handleRoomClick(room.id)}
            >
              {room.room_name}
            </li>
          ))}
        </ul>
      </div>
      <div className="sidebar-group">
        <div className="sidebar-group-header">
          <h3>Channels</h3>
          <h3>
            <span role="button" onClick={() => setIsChannelModalOpen(true)}>
              +
            </span>
          </h3>
        </div>
        <ul>
          {channelList.map((channel, index) => (
            <li
              role="button"
              key={index}
              onClick={() =>
                handleChannelClick(channel.id, channel.channel_name)
              }
            >
              # {channel.channel_name}
            </li>
          ))}
        </ul>
      </div>
      <div className="sidebar-group">
        <h3>Direct Messages</h3>
        <ul>
          {dmChannel.map((channel, index) => (
            <li
              role="button"
              key={index}
              onClick={() =>
                handleChannelClick(channel.id, channel.channel_name)
              }
            >
              {channel.channel_name}
            </li>
          ))}
        </ul>
      </div>
      <div className="sidebar-card">
        <div>
          <small>Welcome,</small>
          <h4>Mateo Bonete</h4>
        </div>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <Modal
        isOpen={isRoomModalOpen}
        onClose={() => setIsRoomModalOpen(false)}
        title="Create your room"
      >
        <div className="input-group">
          <input type="text" id="roomName" placeholder="My room" required />
          <button>Create</button>
        </div>
        <h2>Have an invite already?</h2>
        <div className="input-group">
          <input type="text" id="roomCode" placeholder="Code" required />
          <button>Join room</button>
        </div>
      </Modal>
      <Modal
        isOpen={isChannelModalOpen}
        onClose={() => setIsChannelModalOpen(false)}
        title="Create your channel"
      >
        <div className="input-group">
          <input
            type="text"
            id="channelName"
            placeholder="My channel"
            required
          />
          <button>Create</button>
        </div>
        <h2>Have an invite already?</h2>
        <div className="input-group">
          <input type="text" id="roomCode" placeholder="Code" required />
          <button>Join room</button>
        </div>
      </Modal>
    </div>
  );
};
