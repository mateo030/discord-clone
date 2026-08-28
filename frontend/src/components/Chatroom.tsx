import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

import { Modal } from "@/components/Modal";
import type { Message } from "@/types/api";
import type { MessageData } from "@/types/types";
import { formatDate } from "@/utils/formatDate";

type ChatroomProps = {
  selectedChannelName: string;
  messageList: Message[];
  onMessageSend: SubmitHandler<MessageData>;
};

export const Chatroom: React.FC<ChatroomProps> = ({
  selectedChannelName,
  messageList,
  onMessageSend,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MessageData>();
  const [isDmModalOpen, setIsDmModalOpen] = useState<boolean>(false);

  return (
    <div className="chatroom">
      <div className="chatroom-header">
        <h2>
          # {selectedChannelName ? selectedChannelName : "No channel selected"}
        </h2>
      </div>
      <div className="chatroom-body">
        {messageList &&
          messageList.map((message, index) => (
            <div key={index} className="message">
              <div className="message-name">
                <p>{message.senderName}</p>
                <small>{formatDate(message.createdAt)}</small>
              </div>
              <p>{message.content}</p>
            </div>
          ))}
      </div>
      {/* Chat input */}

      <div className="chatroom-composer">
        {errors.content && <p>{errors.content.message}</p>}
        <form onSubmit={handleSubmit(onMessageSend)}>
          <textarea
            id="content"
            className="composer-textarea"
            placeholder="Message #General..."
            {...register("content", {
              required: "Your message should not be empty",
              maxLength: {
                value: 200,
                message: "Maximum 200 characters allowed",
              },
            })}
          ></textarea>
          <button type="submit" className="btn-send">
            Send
          </button>
        </form>
      </div>

      {/* Modal */}
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
