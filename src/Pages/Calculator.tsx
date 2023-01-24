import "./calculator.scss";
import { calcButtons } from "../lib/calcButtons";
import { useEffect, useState } from "react";
import { isNumberObject } from "util/types";
import { execPath } from "process";
import { Display } from "../Components/calcDisplay";
type Operand = (number | Equation) | null;
type Operands = [Operand, Operand];
type math = string | number;
type maths = math[];
type Equations = math | math[];
type operator = "^" | "*" | "/" | "+" | "-" | undefined;
class Equation {
  nums: Operands = [null, null];
  op: string = "";
  constructor(nums: Operands, op: string) {
    this.nums = nums;
    this.op = op;
  }
  //if new operator greater than

  addToEquation(num: number | Equation, op?: operator) {}

  addToNums(num: number | Equation) {
    console.log("Adding num: " + num);
    console.log("To these nums: " + this.nums);
    if (this.nums[0] === null) {
      this.nums[0] = num;
      return 0;
    } else if (this.nums[1] === null) {
      this.nums[1] = num;
      return 1;
    } else {
      console.log("Equation.Nums is full" + this.nums[0] + " " + this.nums[1]);
      return -1;
    }
  }
  clear() {
    this.nums = [null, null];
    this.op = "";
  }
}

const Equate = (eq: Equation): number => {
  let x = eq.nums[0] as number;
  let y = eq.nums[1] as number;
  let op = eq.op;
  let ans: number;
  if (typeof eq.nums[0] === "object") {
    x = Equate(eq.nums[0] as Equation);
  }
  if (typeof eq.nums[1] === "object") {
    y = Equate(eq.nums[1] as Equation);
  }
  ans = calculate[op](x, y);
  return ans;
};

const printEquation = (eq: Equation): string => {
  console.log("nums0: " + eq.nums[0]);
  console.log("nums1: " + eq.nums[1]);
  let desc: string = "";
  typeof eq.nums[0] === "object"
    ? (desc = desc.concat(printEquation(eq.nums[0] as Equation)))
    : (desc = desc.concat(eq.nums[0] + " "));
  desc = desc.concat(eq.op + " ");
  typeof eq.nums[1] === "object"
    ? (desc = desc.concat(printEquation(eq.nums[1] as Equation)))
    : (desc = desc.concat(eq.nums[1] + " "));
  console.log("Desc: " + desc);
  return desc;
};

const calculate: { [key: string]: (x: number, y: number) => number } = {
  "*": (x, y) => x * y,
  "/": (x, y) => x / y,
  "+": (x, y) => x + y,
  "-": (x, y) => x - y,
};

const precedence = (op: string) => {
  switch (op) {
    case "^":
      return 3;
    case "*":
    case "/":
      return 2;
    case "+":
    case "-":
      return 1;
    default:
      return -1;
  }
};

const convertStrToMath = (str: string) => {
  const equations: math[] = [];
  let prevNum: number = 0;
  for (let i = 0; i < str.length; i++) {
    const char: string = str[i];
    let num: number = Number(char);
    if (isNaN(num)) {
      equations.push(char);
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
};

const convertInfixToPostfix = (expression: math[]) => {
  const postfixStack = [""];
  const postfixExpression: math[] = [];
  let stackElem;
  for (let i = 0; i < expression.length; i++) {
    const elem = expression[i];
    if (typeof elem === "number") {
      postfixExpression.push(elem);
    } else if (elem === "(") {
      postfixStack.push("(");
    } else if (elem === ")") {
      while (postfixStack.at(-1) !== "(") {
        const num = postfixStack.pop();
        postfixExpression.push(num as math);
      }
      postfixStack.pop();
    } else {
      while ((stackElem = postfixStack.pop())) {
        if (precedence(elem) <= precedence(stackElem)) {
          postfixExpression.push(stackElem);
        } else {
          postfixStack.push(stackElem);
          break;
        }
      }
      postfixStack.push(elem);
    }
  }
  while ((stackElem = postfixStack.pop())) {
    postfixExpression.push(stackElem);
  }
  console.log("Postfix: " + postfixExpression.toString());
  return postfixExpression;
};

const equatePostfix = (expression: math[]) => {
  const expressionStack: math[] = [];
  let op;
  while ((op = expression.shift())) {
    if (typeof op === "number") {
      expressionStack.push(op);
    } else if (typeof op === "string") {
      const x = expressionStack.pop();
      const y = expressionStack.pop();
      const ans = calculate[op](y as number, x as number);
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
};

const convertMathToEquation = (
  equation: Equations[],
  iter: number = 0
): [Equation, number] => {
  const newEquation = new Equation([null, null], "");
  const nums: number[] = [];
  const ops: string[] = [];
  //Loop through array of numbers and strings (operators or parentheses)
  for (; iter < equation.length; iter++) {
    const elem = equation[iter];
    if (typeof elem === "number") {
      //if the element is a number, add the number
      console.log("here1");
      newEquation.addToNums(elem);
    } else if (typeof elem === "string") {
      if (elem === "(") {
        let [parenth, i] = convertMathToEquation(equation.slice(iter + 1));
        if (newEquation.addToNums(parenth) === -1) {
          console.log("Error: newEquation is full");
        }
        iter = iter + i;
      } else if (elem === ")") {
        return [newEquation, iter + 1];
      } else newEquation.op = elem;
    }
  }
  return [newEquation, iter];
};

let nextId: number = 0;

const CalcButtons = () => {
  let loaded: boolean = false;
  let firstMount: boolean = true;
  let lastMount: boolean = false;
  const [disp, setDisp] = useState("");
  //const histo: string[] = sessionStorage.getItem("calcHistory")?.split(",");

  const [history, setHistory] = useState<string[]>([]);
  const [operation, setOperation] = useState("");
  const storage = sessionStorage.getItem("calcHistory")?.split(",");
  if (firstMount) {
    storage?.forEach((elem, index) => {
      //console.log(elem);
      setHistory([...history, elem]);
    });
    sessionStorage.removeItem("calcHistory");
    firstMount = false;
  }
  function handleClick(op: string) {
    switch (op) {
      case "=":
        console.log("here");
        const expression = convertStrToMath(disp);
        const postfix = convertInfixToPostfix(expression);
        const answer = equatePostfix(postfix);
        setHistory([...history, disp + " = " + answer]);

        setDisp(answer);
        break;
      case "clr":
        setDisp("");
        break;
      default:
        setDisp(disp + op);
    }
  }
  //sessionStorage.setItem("calcHistory", history.join());
  function handleHistoryClick(hist: string) {
    const ans = hist.split(" = ");
    setDisp(disp + "(" + ans[1] + ")");
  }
  const SetDisplay = () => {
    return Display(disp);
  };
  /* useEffect(() => {
    console.log("Mounting Calculator: " + history.length);
    const historyStorage = sessionStorage.getItem("calcHistory")?.split(",");
    if (historyStorage !== undefined) {
      historyStorage.forEach((elem, index) => {
        //console.log(elem);
        setHistory([...history, elem]);
      });
      sessionStorage.removeItem("calcHistory");
    }
  }, [history]); */

  useEffect(() => {
    return () => {
      if (lastMount !== false) {
        sessionStorage.setItem("calcHistory", history.join());
        console.log("Storing these values: " + history);
        console.log("Dismounting Calculator");
      } else lastMount = true;
    };
  }, []);
  return (
    <div className="calcContainer">
      <div className="calcUnitContainer">
        <SetDisplay />
        <div className="calcButtonsWrapper">
          {calcButtons.map((button) => {
            return (
              <div
                key={button.key}
                className={`calcButtonContainer ${button.type} ${button.key}`} /* style={{flexGrow: button.size}} */
              >
                {/* {item.icon} */}
                <button
                  className="calcButton"
                  onClick={() => handleClick(button.text)}
                >
                  <p>{button.text}</p>
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <div className="calcHistory">
        {history.map((elem, index) => {
          return (
            <div key={index}>
              <li
                className="calcHistoryList"
                onClick={() => handleHistoryClick(elem)}
              >
                {elem}
              </li>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function Calculator() {
  return <CalcButtons />;
}
