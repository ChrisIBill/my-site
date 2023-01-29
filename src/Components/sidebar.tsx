import { useState } from "react";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import PagesData from "../lib/pageData";
import { MenuBtn } from "./elements";
import "./sidebar.scss";

export default function Sidebar() {
    const RouterData = new PagesData();
    const pages = RouterData.getPages();
    const resources = RouterData.getResources("home");
    const [isOpen, setIsOpen] = useState(true);
    const [isActiveLink, setIsActiveLink] = useState(false);
    const handleClick = () => {
        console.log("click2");
        setIsOpen(!isOpen);
    };
    resources?.map((elem) => {
        return console.log(elem.path);
    });
    const Links = resources?.map((elem) => {
        return (
            <li key={elem.id}>
                <NavLink
                    to={elem.path}
                    className={({ isActive }) =>
                        isActive ? "activeLink" : undefined
                    }
                >
                    {elem.id}
                </NavLink>
            </li>
        );
    });
    const NavList = () => {};
    return (
        <div className={`sidebar${isOpen ? "" : "--closed"}`}>
            <script src="../node_modules/feather-icons/dist/feather.js"></script>
            <div
                className="btnWrapper"
                onClick={() => {
                    setIsOpen(!isOpen);
                }}
            >
                <MenuBtn />
            </div>
            <ul>
                {resources?.map((elem) => {
                    return (
                        <li key={elem.id}>
                            <NavLink to={elem.path}>
                                {isOpen ? elem.text : ""}
                                {elem.icon}
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
            <script></script>
        </div>
    );
}
