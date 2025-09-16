import { useChatStore } from "../store/useChatStore";
import React, { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-white">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 bg-zinc-200 space-y-4">
        {messages.map((message, index) => {
          const isOwnMessage = message.senderId === authUser._id;
          return (
            <div
              key={message._id || index}
              ref={messageEndRef}
              className={`flex items-start gap-3 ${isOwnMessage ? "justify-end" : "justify-start"}`}
            >
              {/* Avatar (left side for others) */}
              {!isOwnMessage && (
                <div className="w-10 h-10 rounded-full border overflow-hidden">
                  <img
                    src={selectedUser.profilePic || "/avatar.png"}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Message content */}
              <div className={`flex flex-col max-w-xs sm:max-w-sm ${isOwnMessage ? "items-end" : "items-start"}`}>
                <div className="text-xs text-gray-500 mb-1">
                  {formatMessageTime(message.createdAt)}
                </div>

                <div
                  className={`rounded-lg px-3 py-2 text-sm shadow-md
                  ${isOwnMessage ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-900"}`}
                >
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="max-w-[200px] rounded-md mb-2"
                    />
                  )}
                  {message.text && <p>{message.text}</p>}
                </div>
              </div>

              {/* Avatar (right side for own messages) */}
              {isOwnMessage && (
                <div className="w-10 h-10 rounded-full border overflow-hidden">
                  <img
                    src={authUser.profilePic || "/avatar.png"}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
