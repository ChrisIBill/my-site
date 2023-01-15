import "./calculator.css"
import { calcButtons } from "../lib/calcButtons";

const CalcButtons = () => {
    return (
        <div className="calcContent">
            {calcButtons.map((button) => {
        return (
          <div key={button.id} className="calcButtonContainer">
            {/* {item.icon} */}
            <button className="calcButton">{button.text}</button>
          </div>
        );
      })}
        </div>
    )
}

export default function Calculator() {
    return <CalcButtons />;
}
