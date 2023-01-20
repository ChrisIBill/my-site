import { Link, Route, Routes } from "react-router-dom";
import { navData } from "../lib/pagesData";
import { Router } from "../lib/pagesData";
import "./sidebar.scss";

export default function Sidebar() {
  const pages = Router.routes;
  return (
    <div id="sidebar">
      <button className="menuButton"></button>
      <ul>
        <li>
          <Link to={`/About`}>About Me</Link>
        </li>
        <li>
          <Link to={`/Calculator`}>Calculator</Link>
        </li>
        <li>
          <Link to={`/Settings`}>Settings</Link>
        </li>
      </ul>
    </div>
  );
}