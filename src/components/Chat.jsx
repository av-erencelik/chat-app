import { AiTwotoneVideoCamera, AiOutlineUserAdd } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { BiImageAdd, BiSend } from "react-icons/bi";
import { MdAttachFile } from "react-icons/md";
import Messages from "./Messages";

export default function Chat() {
  return (
    <div className="chat">
      <div className="chatInfo">
        <span className="name">Eren Çelik</span>
        <div className="chatIcons">
          <AiTwotoneVideoCamera></AiTwotoneVideoCamera>
          <AiOutlineUserAdd></AiOutlineUserAdd>
          <BsThreeDots></BsThreeDots>
        </div>
      </div>
      <Messages></Messages>
      <div className="input">
        <input type="text" placeholder="Type something..."></input>
        <div className="send">
          <MdAttachFile className="icon"></MdAttachFile>
          <input type="file" style={{ display: "none" }} id="file"></input>
          <label htmlFor="file">
            <BiImageAdd className="icon"></BiImageAdd>
          </label>
          <BiSend className="icon"></BiSend>
        </div>
      </div>
    </div>
  );
}
