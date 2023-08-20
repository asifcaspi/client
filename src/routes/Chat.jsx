import React, { useState, useEffect, useContext } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import AuthContext from "../AuthContext.jsx";
import axiosInstance from "../axios.js";

const ChatPage = () => {
  const { baseUrl, token } = useContext(AuthContext);
  const { id } = useParams();
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const [otherUser, setOtherUser] = useState({});

  const room = token.id > id ? `${token.id}${id}` : `${id}${token.id}`;

  useEffect(() => {
    const newSocket = io("http://localhost:3001", {
      transports: ["websocket"],
    });

    newSocket.on("connect", () => {
      console.log("Connected to server");
    });

    newSocket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    newSocket.on("otherUser", (user) => {
      setOtherUser(user);
    });

    setSocket(newSocket);

    newSocket.emit("joinRoom", room);

    axiosInstance
      .get(baseUrl + `users/${id}`)
      .then((response) => {
        setOtherUser({
          image: response.data.image_url,
          name: response.data.user_name,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleLeaveRoom = () => {
    socket.emit("leaveRoom", currentRoom);
  };

  const handleSendMessage = () => {
    if (socket && inputMessage.trim() !== "") {
      const newMessage = { text: inputMessage, sender: "You" };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      socket.emit("sendMessage", newMessage);
      setInputMessage("");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md">
        <div className="other-user-info mb-4 text-center">
          {otherUser && (
            <div className="flex flex-col items-center">
              <img
                src={otherUser.image}
                alt={otherUser.name}
                className="w-16 h-16 rounded-full mb-2"
              />
              <p className="text-xl font-semibold">{otherUser.name}</p>
            </div>
          )}
        </div>
        <div className="message-list flex flex-col">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message mt-1 ${
                message.sender === "You" ? "self-end" : "self-start"
              }`}
            >
              <p
                dir="rtl"
                className={`text-sm p-2 rounded-lg ${
                  message.sender !== "You"
                    ? " text-blue-600 bg-blue-100"
                    : " text-green-600 bg-green-100"
                } w-fit`}
              >
                {message.text}
              </p>
            </div>
          ))}
        </div>
        <div className="input-box mt-4">
          <input
            dir="rtl"
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="border rounded py-2 px-3 w-full"
            placeholder="היי מה נשמע?"
          />
          <button
            className="chat-send-button bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-2"
            onClick={handleSendMessage}
          >
            שלח
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
