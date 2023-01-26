import "./Home.scss";
import Sidebar from "../Components/sidebar";
import { Outlet, Link } from "react-router-dom";
import React, { useState } from "react";
import { CssBaseline } from "@mui/material";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const sidebarButtonClick = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <div id="page-wrapper">
        <div id="header">Header</div>
        <div id="main-wrapper">
          <Sidebar isOpen={sidebarOpen} toggleSidebar={sidebarButtonClick} />
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
    </React.Fragment>
  );
}
