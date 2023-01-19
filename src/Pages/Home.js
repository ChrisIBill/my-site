import "./Home.scss";
import Sidebar from "../Components/sidebar";
import { Outlet, Link } from "react-router-dom";
import { useState } from "react";

export default function Home() {
    const [open, setOpen] = useState(true);
    const menuButtonClick = () => {
        setOpen(!open);
    };
    return (
        <div id="page-wrapper">
            <div id="header">Header</div>
            <div id="main-wrapper">
                <Sidebar />
                {/* <div id={open ? "sidebar" : "sidebar:closed"}>
        <nav>
          <button id="menuButton" onClick={menuButtonClick}></button>
          <ul>
            <li>
              <Link to={`/About`}>About Me</Link>
            </li>
            <li>
              <Link to={`/Calculator`}>Calulator</Link>
            </li>
            <li>
              <Link to={`/Settings`}>Settings</Link>
            </li>
          </ul>
        </nav>
      </div> */}
                <div id="content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
