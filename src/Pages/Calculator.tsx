import "./calculator.scss";
import { calcButtons } from "../lib/calcButtons";
import { useState } from "react";
import { isNumberObject } from "util/types";
type Operand = (number | Equation) | null;
type Operands = [Operand, Operand];
type math = string | number;
type maths = math[];
type Equations = math | math[];

class Equation {
    nums: Operands = [null, null];
    op: string = '';
    constructor(nums: Operands, op: string) {
        this.nums = nums;
        this.op = op;
    }

    addToNums(num: (number | Equation)) {
        console.log("Adding num: " + num)
        console.log("To these nums: " + this.nums)
        if (this.nums[0] === null) {
            this.nums[0] = num;
            return 0;
        } else if (this.nums[1] === null) {
            this.nums[1] = num;
            return 1;
        } else {
            console.log("Equation.Nums is full" + this.nums[0] + " " + this.nums[1]);
            return -1;
        };
    }
    clear() {
        this.nums = [null, null];
        this.op = '';
    }
    /* Equate(eq: Equation) {
        if (typeof this.nums[0] === 'object') {
            console.log("Recursion");
            Equate(this.nums[0] as Equation)
        } else if (typeof this.nums[1] === 'object') {
            console.log("Recursion");
            Equate(this.nums[1] as Equation)
        }
        return calculate[this.op](this.nums[0] as number, this.nums[1] as number)
    } */


}

const Equate = (eq: Equation): number => {
    let x = eq.nums[0] as number
    let y = eq.nums[1] as number
    let op = eq.op
    let ans: number;
    if (typeof eq.nums[0] === 'object') {
        x = Equate(eq.nums[0] as Equation)
    }
    if (typeof eq.nums[1] === 'object') {
        y = Equate(eq.nums[1] as Equation)
    }
    ans = calculate[op](x, y);
    /* console.log("Operating: " + eq.nums[0] + eq.op + eq.nums[1]);
    console.log("Answer: " + ans); */
    return ans;
}

const printEquation = (eq: Equation): string => {
    console.log("nums0: " + eq.nums[0]);
    console.log("nums1: " + eq.nums[1]);
    let desc: string = "";
    (typeof eq.nums[0] === 'object') ? desc = desc.concat(printEquation(eq.nums[0] as Equation)) : desc = desc.concat(eq.nums[0] + " ");
    desc = desc.concat(eq.op + " ");
    (typeof eq.nums[1] === 'object') ? desc = desc.concat(printEquation(eq.nums[1] as Equation)) : desc = desc.concat(eq.nums[1] + " ");
    console.log("Desc: " + desc);
    return desc;
}
/* const Equation = () => {
    const [nums, setNums] = useState<Operands>([null, null])
    const [op, setOp] = useState("");

} */

//type operators = ['*', '/', '+', '-'];
/* const calculate = (values: Operands, expr: string): number | undefined=> {
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
} */

const calculate: { [key: string]: (x: number, y: number) => number } = {
    '*': (x, y) => x * y,
    '/': (x, y) => x / y,
    '+': (x, y) => x + y,
    '-': (x, y) => x - y
};

const convertStrToMath = (str: string) => {
    const equations: Equations[] = [];
    const prevNum: number = 0;
    for (let i = 0; i < str.length; i++) {
        const char: string = str[i];
        let num: number = Number(char);
        if (isNaN(num)) {
            equations.push(char)
        } else if (prevNum) {
            num = prevNum * 10 + num;
            equations.push(num);
        } else equations.push(num);
    }
    return convertMathToEquation(equations);
}

const convertMathToEquation = (equation: Equations[], iter: number = 0): [Equation, number] => {
    const newEquation = new Equation([null, null], '')
    const nums: number[] = [];
    const ops: string[] = [];

    for (; iter < equation.length; iter++) {
        const elem = equation[iter];
        if (typeof elem === 'number') {
            console.log("here1")
            newEquation.addToNums(elem);
        } else if (typeof elem === 'string') {
            if (elem === '(') {
                let [parenth, i] = convertMathToEquation(equation.slice(iter + 1))
                if (newEquation.addToNums(parenth) === -1) {
                    console.log("Error: newEquation is full")
                }
                iter = iter + i;
            } else if (elem === ')') {
                return [newEquation, iter + 1];
            } else newEquation.op = elem;
        }
    }
    return [newEquation, iter];
    /* equation.forEach((elem, index) => {
        if (typeof elem === 'number') {
            newEquation.addToNums(elem);
        } else if (typeof elem === 'string') {
            if (elem === '(') {
                let [parenth, i] = convertMathToEquation(equation.slice(index))
            }
            ops.push(elem);
        }
    }) */

    /* while (ops) {
        ops.indexOf('/')
        ops.indexOf('+')
        ops.indexOf('-')
        if(ops.indexOf('*'))
    } */
}

/* const parseDisp = (str: math[], iter: number = 0): [(Equations)[], number] => {
    //
    //const equation2: Array<math> = [];
    let equation: (Equations)[] = [];
    const newEquations: (Equations)[] = [];
    for (; iter < str.length; iter++) {
        const char: math = str[iter];
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
} */

/* const calcEquations = (equation: Equations[]) => {
    const nums: number[] = [];
    const ops: string[] = [];
    let calc = new Equation([null, null], '');
    for (let i = 0; i < equation.length; i++) {
        //console.log(equation[i]);
        let cur = equation[i]
        if ((typeof cur) === 'string') {
            console.log("string");
        } else if ((typeof cur) === 'number') {
            console.log("number")
        } else calcEquation(equation[i] as math[]);
    }

    equation.forEach((elem, index) => {
        if (typeof elem === 'object') {
            
        }
        if (typeof elem === 'number') {
            if (!calc.num1) {
                calc.num1 = elem;
            } else if (!calc.num2) {
                calc.num2 = elem;
            }
        } else if (typeof elem === 'string') {
            ops.push(elem);
        }
    })
} */

let nextId: number = 0;

const CalcButtons = () => {
    const [disp, setDisp] = useState('')
    const [values, setValues] = useState<number[]>([]);
    const [operation, setOperation] = useState('');

    function handleClick(op: string) {
        console.log("Calc button clicked: " + op)
        switch (op) {
            case '=':
                let [equation, iter] = convertStrToMath(disp);
                console.log("Equation: " + printEquation(equation));
                console.log("Equate: " + Equate(equation))
                setDisp(printEquation(equation) + " = " + Equate(equation));
                break;
            case 'clr':
                setDisp('');
                break;
            default: setDisp(disp + op);
        }
    }

    const Display = () => {
        return <div className="display">{disp}</div>;
    };
    const NumKeys = calcButtons.filter(button => button.type === 'num')
    return (
        <div className="calcContainer">
            <div className="calcUnitContainer">
                <Display />
                <div className="calcButtonsWrapper">
                {calcButtons.map((button) => {
                    return (
                        <div key={button.key} className={`calcButtonContainer ${button.type} ${button.key}`} /* style={{flexGrow: button.size}} */>
                             {/* {item.icon} */}
                            <button className="calcButton" onClick={() => handleClick(button.text)}><p>{button.text}</p></button>
                        </div>
                    );
                })}
                </div>
            </div>
            <div className="calcHistory">Calculator History</div>
        </div>
    );
};

export default function Calculator() {
    return <CalcButtons />;
}
