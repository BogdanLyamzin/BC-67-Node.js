import { useState, useEffect, useCallback } from "react";
import {nanoid} from "nanoid";
import io from "socket.io-client";

import SigninChatForm from "./components/SigninChatForm/SigninChatForm";
import ChatForm from "./components/ChatForm/ChatForm";
import Chat from "./components/Chat/Chat";

function App() {
  const [nickname, setNickname] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(()=> {
    if(nickname) {
      const ws = io.connect("http://localhost:5000");
      setSocket(ws);

      ws.on("chat-message", data => {
        setMessageList(prevMessageList => {
          const {nickname, message} = JSON.parse(data);
          const newMessage = {
            id: nanoid(),
            type: "user",
            nickname,
            message,
          };
    
          return [...prevMessageList, newMessage];
        });
      })
    }
  }, [nickname]);

  const addNickname = useCallback(data => setNickname(data.nickname), []);

  const addMessage = useCallback(({message})=> {
    setMessageList(prevMessageList => {
      const newMessage = {
        id: nanoid(),
        type: "you",
        nickname,
        message,
      };

      return [...prevMessageList, newMessage];
    });

    socket.emit("chat-message", JSON.stringify({nickname, message}));
  }, [nickname, socket]);

  return (
    <div className="App">
      {!nickname && <SigninChatForm onSubmit={addNickname} />}
      {nickname && <ChatForm onSubmit={addMessage} />}
      {nickname && <Chat items={messageList} />}
    </div>
  )
}

export default App;
