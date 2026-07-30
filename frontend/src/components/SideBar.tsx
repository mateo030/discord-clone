import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

import { Modal } from "@/components/Modal";
import type { Channel, Room } from "@/types/api";
import type {
  CreateRoomFormData,
  JoinRoomFormData,
  CreateChannelFormData,
} from "@/types/types";

interface SideBarProps {
  roomList: Room[];
  channelList: Channel[];
  onRoomClick(roomId: string): void;
  onChannelClick(channelId: string, channelName: string): void;
  handleLogout(): void;
  onRoomSubmit: SubmitHandler<CreateRoomFormData>;
  onRoomJoin: SubmitHandler<JoinRoomFormData>;
  onChannelSubmit: SubmitHandler<CreateChannelFormData>;
}

export const SideBar: React.FC<SideBarProps> = ({
  roomList,
  channelList,
  onRoomClick,
  onChannelClick,
  handleLogout,
  onRoomJoin,
  onRoomSubmit,
  onChannelSubmit,
}) => {
  const [isRoomModalOpen, setIsRoomModalOpen] = useState<boolean>(false);
  const [isChannelModalOpen, setIsChannelModalOpen] = useState<boolean>(false);
  const {
    register: registerRoom,
    handleSubmit: handleRoomSubmit,
    formState: { errors: roomErrors },
  } = useForm<CreateRoomFormData>();
  const {
    register: registerRoomJoin,
    handleSubmit: handleRoomJoinSubmit,
    formState: { errors: roomJoinErrors },
  } = useForm<JoinRoomFormData>();
  const {
    register: registerChannel,
    handleSubmit: handleChannelSubmit,
    formState: { errors: channelErrors },
  } = useForm<CreateChannelFormData>();

  function renderRoomList(list: Room[]) {
    if (!list || list.length === 0) {
      return <li>No joined rooms yet</li>;
    }
    return list.map((room, index) => (
      <li role="button" key={index} onClick={() => onRoomClick(room.id)}>
        {room.roomName}
      </li>
    ));
  }

  function renderChannelList(list: Channel[]) {
    if (!list || list.length === 0) {
      return <li>No channels within this room</li>;
    }
    return list.map((channel, index) => (
      <li
        role="button"
        key={index}
        onClick={() => onChannelClick(channel.id, channel.channelName)}
      >
        # {channel.channelName}
      </li>
    ));
  }

  return (
    <div className="sidebar">
      <div className="sidebar-group">
        <div className="sidebar-group-header">
          <h3>My Rooms</h3>
          <h3>
            <span role="button" onClick={() => setIsRoomModalOpen(true)}>
              +
            </span>
          </h3>
        </div>
        <ul>{renderRoomList(roomList)}</ul>
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
        <ul>{renderChannelList(channelList)}</ul>
      </div>
      <div className="sidebar-group">
        <h3>Direct Messages</h3>
        <ul>
          {/* {dmChannel.map((channel, index) => (
            <li
              role="button"
              key={index}
              onClick={() => onChannelClick(channel.id, channel.channelName)}
            >
              {channel.channelName}
            </li>
          ))} */}
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
        <form onSubmit={handleRoomSubmit(onRoomSubmit)}>
          <div className="input-group">
            <input
              type="text"
              id="roomName"
              placeholder="My room"
              {...registerRoom("roomName", {
                required: "Please input a room name",
                pattern: {
                  value: /^[a-zA-Z0-9]+$/,
                  message: "Input a valid room name",
                },
              })}
            />
            {roomErrors.roomName && <p>{roomErrors.roomName.message}</p>}
            <p></p>
            <button type="submit">Create</button>
          </div>
        </form>
        <form onSubmit={handleRoomJoinSubmit(onRoomJoin)}>
          <h2>Have an invite already?</h2>
          <div className="input-group">
            <input
              type="text"
              id="code"
              placeholder="Code"
              {...registerRoomJoin("code", {
                required: "Please input a code",
                pattern: {
                  value: /^[a-zA-Z0-9]+$/,
                  message: "Input a valid code",
                },
                maxLength: { value: 6, message: "Up to 6 characters allowed" },
              })}
            />
            {roomJoinErrors.code && <p>{roomJoinErrors.code.message}</p>}
            <button type="submit">Join room</button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isChannelModalOpen}
        onClose={() => setIsChannelModalOpen(false)}
        title="Create your channel"
      >
        <form onSubmit={handleChannelSubmit(onChannelSubmit)}>
          <div className="input-group">
            <input
              type="text"
              id="channelName"
              placeholder="My channel"
              {...registerChannel("channelName", {
                required: "Please input a channel name",
                pattern: {
                  value: /^[a-zA-Z0-9]+$/,
                  message: "Input a valid channel name",
                },
              })}
            />
            {channelErrors.channelName && (
              <p>{channelErrors.channelName.message}</p>
            )}
            <button type="submit">Create</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
