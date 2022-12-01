import { doc, onSnapshot } from "firebase/firestore";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { object } from "yup";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";

export default function Chats() {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "usersChat", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
      return () => [unsub()];
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };
  console.log(chats);
  return (
    <div className="chats">
      {Object.entries(chats)?.map((chat) => {
        return (
          <div className="chatUser" key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
            <img src={chat[1].userInfo.photoURL} alt="pp"></img>
            <div className="nameMessage">
              <span className="name">{chat[1].userInfo.displayName}</span>
              <p className="message">{chat[1].lastMessage?.text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
