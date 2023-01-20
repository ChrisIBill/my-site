import "./calculator.scss";
import { calcButtons } from "../lib/calcButtons";
import { useState } from "react";
import { isNumberObject } from "util/types";
import { execPath } from "process";
type Operand = (number | Equation) | null;
type Operands = [Operand, Operand];
type math = string | number;
type maths = math[];
type Equations = math | math[];
type operator = '^' | '*' | '/' | '+' | '-' | undefined;
class Equation {
    nums: Operands = [null, null];
    op: string = '';
    constructor(nums: Operands, op: string) {
        this.nums = nums;
        this.op = op;
    }
    //if new operator greater than 

    addToEquation(num: (number | Equation), op?: operator) {

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

//
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

const precedence = (op: string) => {
    switch (op) {
        case '^':
            return 3;
        case '*':
        case '/':
            return 2;
        case '+':
        case '-':
            return 1;
        default:
            return -1;
    }
}



const convertStrToMath = (str: string) => {
    const equations: math[] = [];
    let prevNum: number = 0;
    for (let i = 0; i < str.length; i++) {
        const char: string = str[i];
        let num: number = Number(char);
        if (isNaN(num)) {
            equations.push(char)
            prevNum = 0;
        } else if (prevNum) {
            num = prevNum * 10 + num;
            prevNum = num;
            equations.pop();
            equations.push(num);
        } else {
            prevNum = num;
            equations.push(num);
        }
    }
    return equations;
    //return convertMathToEquation(equations);
}

const convertInfixToPostfix = (expression: math[]) => {
    const postfixStack = [''];
    const postfixExpression: math[] = [];
    let stackElem;
    for (let i = 0; i < expression.length; i++) {
        const elem = expression[i];
        if (typeof elem === 'number') {
            postfixExpression.push(elem);
        } else if (elem === '(') {
            postfixStack.push('(')
        } else if (elem === ')') {
            while (postfixStack.at(-1) !== '(') {
                const num = postfixStack.pop();
                postfixExpression.push(num as math);
            }
            postfixStack.pop();
        } else {
            while (stackElem = postfixStack.pop()) {
                if (precedence(elem) <= precedence(stackElem)) {
                    postfixExpression.push(stackElem);
                }
                else {
                    postfixStack.push(stackElem);
                    break;
                }
            }
            postfixStack.push(elem);
        }
    }
    while (stackElem = postfixStack.pop()) {
        postfixExpression.push(stackElem)
    }
    console.log("Postfix: " + postfixExpression.toString());
    return postfixExpression;
}

const equatePostfix = (expression: math[]) => {
    const expressionStack: math[] = [];
    let op;
    while (op = expression.shift()) {
        console.log("Evaluating: " + op);
        if (typeof op === 'number') {
            //console.log("Pushing Op");
            expressionStack.push(op);
        } else if (typeof op === 'string') {
            const x = expressionStack.pop();
            const y = expressionStack.pop();
            //console.log("Against: " + x + " " + y);
            const ans = calculate[op](x as number, y as number);
            //console.log("As: " + ans);
            expressionStack.push(ans);
        } else console.log("Error in equatePostfix: unknown element = " + op);
    }
    while (expressionStack.length > 1) {
        const x = expressionStack.pop();
        const y = expressionStack.pop();
        expressionStack.push(Number(x) * Number(y));
    }
    const ans = expressionStack.pop();
    return ans as string;
}

const convertMathToEquation = (equation: Equations[], iter: number = 0): [Equation, number] => {
    const newEquation = new Equation([null, null], '')
    const nums: number[] = [];
    const ops: string[] = [];
    //Loop through array of numbers and strings (operators or parentheses)
    for (; iter < equation.length; iter++) {
        const elem = equation[iter];
        if (typeof elem === 'number') {
            //if the element is a number, add the number 
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
    const [disp, setDisp] = useState('');
    const [history, setHistory] = useState<string[]>([]);
    const [answers, setAnswers] = useState<string[]>([]);
    const [operation, setOperation] = useState('');

    function handleClick(op: string) {
        console.log("Calc button clicked: " + op)
        switch (op) {
            case '=':
                setHistory([...history, disp]);
                const expression = convertStrToMath(disp);
                const postfix = convertInfixToPostfix(expression);
                const answer = equatePostfix(postfix);
                setAnswers([...answers, answer]);
                setDisp(answer);
                /* console.log("Equation: " + printEquation(equation));
                console.log("Equate: " + Equate(equation)) */
                //setDisp(printEquation(equation) + " = " + Equate(equation));
                break;
            case 'clr':
                setDisp('');
                break;
            default: setDisp(disp + op);
        }
    }

    function handleHistoryClick(hist: string) {
        setDisp(disp + '(' + hist + ')')
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
            <div className="calcHistory">
                {history.map((elem, index) => {
                    return (
                        <div key={index}>
                            <li className="calcHistoryList" onClick={() => handleHistoryClick(answers[index])}>{elem} = {answers[index]}</li>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default function Calculator() {
    return <CalcButtons />;
}
