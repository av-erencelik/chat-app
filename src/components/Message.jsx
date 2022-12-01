import { useEffect } from "react";
import { useContext, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

export default function Message({ message }) {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();
  const date = +new Date(new Date().getTime() - new Date(message.date.toDate().getTime())).toISOString().slice(11, 13);
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  return (
    <div className={`message ${message.senderId === currentUser.uid && "owner"}`} ref={ref}>
      <div className="messageInfo">
        <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="pp"></img>
        <span>{date.toString()} hour ago</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="pp"></img>}
      </div>
    </div>
  );
}
