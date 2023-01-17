import "./calculator.scss";
import { calcButtons } from "../lib/calcButtons";
import { useState } from "react";
import { isNumberObject } from "util/types";

type math = string | number;
type maths = math[];
type Equations = math | math[];
const equation2: math[] = [7, '+', 8];
const calculate = (values: number[], expr: string): number | undefined=> {
    switch (expr) {
        case "+":
            return values[0] + values[1];
            break;
        case "-":
            return values[0] - values[1];
            break;
        case "/":
            return values[0] / values[1];
            break;
        case "*":
            return values[0] * values[1];
            break;
        default:
            return undefined;
    }
}

const convertDisp = (str: string) => {
    const equation: math[] = [];
    const prevNum: number = 0;
    for (let i = 0; i < str.length; i++) {
        const char: string = str[i];
        let num: number = Number(char);
        if (isNaN(num)) {
            equation.push(char)
        } else if (prevNum) {
            num = prevNum * 10 + num;
            equation.push(num);
        }
    }
    return parseDisp(equation, 0);
}

const parseDisp = (str: string, iter: number = 0): [(Equations)[], number] => {
    //
    //const equation2: Array<math> = [];
    let equation: (Equations)[] = [];
    const newEquations: (Equations)[] = [];
    for (; iter < str.length; iter++) {
        const char: string = str[iter];
        const prevStr: number = Number(str[iter - 1]);
        console.log("Current Char in parse: " + char);
        const num: number = Number(char);
        if (isNaN(num)) {
            console.log('length: ' + str.length);
            if (char === '(') {
                let [parenth, i] = parseDisp(str.slice(iter + 1))
                
                console.log("Parenth: " + parenth);
                const k: math[] = parenth as math[];
                equation = equation.concat([k]);
                iter += i;
                console.log("here");
                console.log(equation);
            } else if (char === ')') {
                return [equation, iter+1];
            }
            else equation.push(char);
        } else if (num) {
            if (isNaN(prevStr)) {
                equation.push(num);
            } else {
                const prev: number = equation.pop() as number;
                equation.push((prev * 10) + num);
            }
            
        }
    }
    console.log(equation);
    return [equation, iter];
}

const calcEquation = (equation: Equations[]) => {
    const nums: number[] = [];
    const ops: string[] = [];
    for (let i = 0; i < equation.length; i++) {
        //console.log(equation[i]);
        let cur = equation[i]
        if ((typeof cur) === 'string') {
            console.log("string");
        } else if ((typeof cur) === 'number') {
            console.log("number")
        } else calcEquation(equation[i] as math[]);
    }
}
const printEquation = (eqs: Equations[]) => {
    for (let i = 0; i < eqs.length; i++) {

    }
}
let nextId: number = 0;

const CalcButtons = () => {
    const [disp, setDisp] = useState('')
    const [values, setValues] = useState<number[]>([]);
    const [operation, setOperation] = useState('');

    function handleClick(op: string) {
        console.log("Calc button clicked: " + op)
        if (op === '=') {
            let [equation, iter] = parseDisp(disp);
            calcEquation(equation);
        } else {
            setDisp(disp + op)
        }
        /* if (isNaN(Number(op))) {
            setValues([
                ...values,
                num
            ])
            setOperation(op);
        } else {
            setNum(num + op)
        } */
    }

    const Display = () => {
    //const calcValue: number | undefined = calculate();
        return <div className="display">{ disp }</div>;
    };

    return (
        <div className="calcContent">
            {/* <div className="display"></div> */}
            <Display />
            {calcButtons.map((button) => {
                return (
                    <div key={button.id} className="calcButtonContainer" /* style={{flexGrow: button.size}} */>
                        {/* {item.icon} */}
                        <button className="calcButton" onClick={() => handleClick(button.text)}>{button.text}</button>
                    </div>
                );
            })}
        </div>
    );
};

export default function Calculator() {
    return <CalcButtons />;
}
