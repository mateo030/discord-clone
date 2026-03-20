import { useEffect, useState } from "react";
import { roomAPI } from "../../api/roomAPI";
import { channelAPI } from "../../api/channelAPI";
import { messageAPI } from "../../api/messageAPI";
import type { Room } from "../../types/api";
import type { Channel } from "../../types/api";
import type { Message } from "../../types/api";
import "./style.css";

export const Dash: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isChannelModalOpen, setIsChannelModalOpen] = useState<boolean>(false);
  const [isDmModalOpen, setIsDmModalOpen] = useState<boolean>(false);
  const [roomList, setRoomList] = useState<Array<Room>>([]);
  const [selectedRoomId, setSelectedRoomId] = useState<string>("");
  const [channelList, setChannelList] = useState<Array<Channel>>([]);
  const [selectedChannelId, setSelectedChannelId] = useState<string>("");
  const [messageList, setMessageList] = useState<Array<Message>>([]);
  const [dmChannel, setDmChannelList] = useState<Array<Channel>>([]);

  useEffect(() => {
    roomAPI.get().then((response) => {
      setRoomList(response);
      setSelectedRoomId(response[0].id);
    });
  }, []);

  useEffect(() => {
    if (!selectedRoomId) {
      return;
    }
    channelAPI.get(selectedRoomId).then((response) => {
      setChannelList(response);
      setSelectedChannelId(response[0].id);
    });
  }, [selectedRoomId]);

  useEffect(() => {
    if (!selectedChannelId) {
      return;
    }
    messageAPI.get(selectedChannelId).then((response) => {
      setMessageList(response);
    });
  }, [selectedChannelId]);

  useEffect(() => {
    if (!selectedChannelId) {
      return;
    }
    messageAPI.get(selectedChannelId).then((response) => {
      setMessageList(response);
    });
  }, [selectedChannelId]);

  const handleNameClick = () => {
    setIsDmModalOpen(true);
  };

  return (
    <div className="content">
      <div className="sidebar">
        <div className="sidebar-header">
          <h1>Slack Clone</h1>
          <h2>←</h2>
        </div>
        <div className="sidebar-group">
          <div className="sidebar-group-header">
            <h3>My Rooms</h3>
            <h3>
              <span onClick={() => setIsModalOpen(true)}>+</span>
            </h3>
          </div>
          <ul>
            {roomList.map((room, index) => (
              <li
                role="button"
                key={index}
                onClick={() => setSelectedRoomId(room.id)}
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
              <span onClick={() => setIsChannelModalOpen(true)}>+</span>
            </h3>
          </div>
          <ul>
            {channelList.map((channel, index) => (
              <li key={index}># {channel.channel_name}</li>
            ))}
          </ul>
        </div>
        <div className="sidebar-group">
          <h3>Direct Messages</h3>
          <ul>
            <li>Takeshi Lim</li>
            <li>Ooya Kiyotomo</li>
            <li>Adrian Tanizaki</li>
          </ul>
        </div>
        <div className="sidebar-card">
          <div>
            <small>Welcome,</small>
            <h4>Mateo Bonete</h4>
          </div>
          <button>Logout</button>
        </div>
      </div>
      <div className="chatroom">
        <div className="chatroom-header">
          <h1># General</h1>
        </div>
        <div className="chatroom-body">
          {messageList.map((message, index) => (
            <div key={index} className="message">
              <div className="message-name">
                <h4>
                  <button
                    className="message-name-button"
                    onClick={() => handleNameClick()}
                  >
                    User
                  </button>
                </h4>
                <small>{message.created_at}</small>
              </div>
              <p>{message.content}</p>
            </div>
          ))}
        </div>
        <div className="chatroom-composer">
          <textarea
            className="composer-textarea"
            placeholder="Message #General..."
          ></textarea>
          <div className="composer-toolbar">
            <div className="toolbar-left">
              <button className="tool-btn">
                <b>B</b>
              </button>
              <button className="tool-btn">
                <i>I</i>
              </button>
              <button className="tool-btn">
                <s>S</s>
              </button>
              <button className="tool-btn">
                <i className="fas fa-code"></i>
              </button>
            </div>

            <div className="toolbar-right">
              <button className="tool-btn">
                <i className="fas fa-paperclip"></i>
              </button>
              <button className="tool-btn">
                <i className="far fa-smile"></i>
              </button>
              <button className="btn-send">Send</button>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <button
              className="modal-close"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>
            <h2>Create your room</h2>
            <div className="input-group">
              <input type="text" id="roomName" placeholder="My room" required />
              <button>Create</button>
            </div>
            <h2>Have an invite already?</h2>
            <div className="input-group">
              <input type="text" id="roomCode" placeholder="Code" required />
              <button>Join room</button>
            </div>
          </div>
        </div>
      )}
      {isChannelModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <button
              className="modal-close"
              onClick={() => setIsChannelModalOpen(false)}
            >
              &times;
            </button>
            <h2>Create a new channel</h2>
            <div className="input-group">
              <input
                type="text"
                id="channelName"
                placeholder="My channel"
                required
              />
              <button>Create</button>
            </div>
          </div>
        </div>
      )}
      {isDmModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <button
              className="modal-close"
              onClick={() => setIsDmModalOpen(false)}
            >
              &times;
            </button>
            <h2>Send a message to Takeshi Lim</h2>
            <div className="input-group">
              <textarea placeholder="Message..."></textarea>
              <button onClick={() => setIsDmModalOpen(false)}>Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
