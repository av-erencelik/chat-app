import { signOut } from "firebase/auth";
import { useContext } from "react";
import { FiLogOut } from "react-icons/fi";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";

export default function Navbar() {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="navbar">
      <span className="logo">Eren Chat</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="pp"></img>
        <span className="name">{currentUser.displayName}</span>
        <button
          onClick={() => {
            signOut(auth);
          }}
        >
          <FiLogOut></FiLogOut>
        </button>
      </div>
    </div>
  );
}
