import React, { useState, useEffect } from "react";

function Chatroom({ chatroomId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    fetch(`/chatrooms/${chatroomId}/messages`)
      .then((response) => response.json())
      .then((data) => setMessages(data));
  }, [chatroomId]);

  useEffect(() => {
    const cable = new WebSocket(`ws://localhost:3000/cable`);
    cable.onopen = () => {
      cable.send(
        JSON.stringify({
          command: "subscribe",
          identifier: JSON.stringify({
            channel: "ChatroomChannel",
            chatroom_id: chatroomId,
          }),
        })
      );
    };

    cable.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    return () => {
      cable.close();
    };
  }, [chatroomId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/chatrooms/${chatroomId}/messages`, {
      method: "POST",
      body: JSON.stringify({ content: newMessage }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setNewMessage(""); // Clear input field after sending message
      });
  };

  return (
    <div className="chatroom">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index}>{msg.content}</div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chatroom;
