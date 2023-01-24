import { useState } from "react";
import "./elements.scss";
export const MenuBtn = (props) => {
    const [toggle, setToggle] = useState(false);
    const handleClick = () => {
        setToggle = !toggle;
        console.log("click");
    };
    return (
        <button className="menuBtn" onClick={props.handleClick}>
            <div className="btnArtLines"></div>
            <div className="btnArtLines"></div>
            <div className="btnArtLines"></div>
        </button>
    );
};
