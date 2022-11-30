import Navbar from "./Navbar";
import Search from "./Search";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <Navbar></Navbar>
      <Search></Search>
    </div>
  );
}
