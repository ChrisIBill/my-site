import { Link, Route, Routes } from "react-router-dom";
import { navData } from "../lib/pagesData";
import { Router } from "../lib/pagesData";
import "./sidenav.css";

export default function Sidebar() {
  const pages = Router.routes;
  return (
    <div>
      <button className="menuButton"></button>
      {pages.map((item) => {
        return (
          <div key={item.id} className="sideitem">
            {/* {item.icon} */}
            <Link to={item.id}>{item.id}</Link>
          </div>
        );
      })}
    </div>
  );
}