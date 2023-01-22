import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { navData } from "../lib/pagesData";
import { Router } from "../lib/pagesData";
import { MenuBtn } from "./elements";
import "./sidebar.scss";

export default function Sidebar() {
  const pages = Router.routes;
  const [isOpen, setIsOpen] = useState(true);
  return (
    
    <div className={`sidebar${isOpen ? "" : "sidebar--closed"}`}>
      <script src="../node_modules/feather-icons/dist/feather.js"></script>
      <div className="btnWrapper"><MenuBtn /></div>
      <ul>
        <li>
          <Link to={`/About`}>About  <i data-feather="circle"></i></Link>
        </li>
        <li>
          <Link to={`/Calculator`}>Calculator</Link>
        </li>
        <li>
          <Link to={`/Settings`}>Settings</Link>
        </li>
      </ul>
      <script>
</script>
    </div>
  );
}