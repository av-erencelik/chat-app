import { FiLogOut } from "react-icons/fi";

export default function Navbar() {
  return (
    <div className="navbar">
      <span className="logo">Eren Chat</span>
      <div className="user">
        <img src="https://images.pexels.com/photos/14148025/pexels-photo-14148025.jpeg" alt="pp"></img>
        <span className="name">Eren Çelik</span>
        <button>
          <FiLogOut></FiLogOut>
        </button>
      </div>
    </div>
  );
}
