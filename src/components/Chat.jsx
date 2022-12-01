import { AiTwotoneVideoCamera, AiOutlineUserAdd } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { BiImageAdd, BiSend } from "react-icons/bi";
import { MdAttachFile } from "react-icons/md";
import Messages from "./Messages";
import { ChatContext } from "../context/ChatContext";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { db, storage } from "../firebase";
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export default function Chat() {
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());
      await uploadBytesResumable(storageRef, img).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          await updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion({
              id: uuid(),
              text,
              senderId: currentUser.uid,
              date: Timestamp.now(),
              img: downloadURL,
            }),
          });
        });
      });
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "usersChat", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    await updateDoc(doc(db, "usersChat", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    setText("");
    setImg(null);
  };
  const handleKey = (e) => {
    e.code === "Enter" && handleSend();
  };
  return (
    <div className="chat">
      <div className="chatInfo">
        <span className="name">{data.user?.displayName}</span>
        <div className="chatIcons">
          <AiTwotoneVideoCamera></AiTwotoneVideoCamera>
          <AiOutlineUserAdd></AiOutlineUserAdd>
          <BsThreeDots></BsThreeDots>
        </div>
      </div>
      <Messages></Messages>
      <div className="input">
        <input
          type="text"
          placeholder="Type something..."
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKey}
          value={text}
        ></input>
        <div className="send">
          <MdAttachFile className="icon"></MdAttachFile>
          <input type="file" style={{ display: "none" }} id="file" onChange={(e) => setImg(e.target.files[0])}></input>
          <label htmlFor="file">
            <BiImageAdd className="icon"></BiImageAdd>
          </label>
          <BiSend className="icon" onClick={handleSend}></BiSend>
        </div>
      </div>
    </div>
  );
}
