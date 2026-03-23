import { useState } from "react";

import { Modal } from "@/components/Modal";
import type { Message } from "@/types/api";

type ChatroomProps = {
  selectedChannelName: string;
  messageList: Message[];
};

export const Chatroom: React.FC<ChatroomProps> = ({
  selectedChannelName,
  messageList,
}) => {
  const [isDmModalOpen, setIsDmModalOpen] = useState<boolean>(false);

  const handleNameClick = () => {
    setIsDmModalOpen(true);
  };

  return (
    <div className="chatroom">
      <div className="chatroom-header">
        <h1># {selectedChannelName}</h1>
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
      <Modal
        isOpen={isDmModalOpen}
        onClose={() => setIsDmModalOpen(false)}
        title="Send message to Takeshi Lim"
      >
        <div className="input-group">
          <textarea placeholder="Message..."></textarea>
          <button onClick={() => setIsDmModalOpen(false)}>Send</button>
        </div>
      </Modal>
    </div>
  );
};
