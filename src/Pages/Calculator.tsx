import "./calculator.scss";
import { calcButtons } from "../lib/calcButtons";
import { useEffect, useState } from "react";
import { isNumberObject } from "util/types";
import { execPath } from "process";
import { Display } from "../Components/calcDisplay";
import {
    Button,
    Container,
    createTheme,
    Paper,
    responsiveFontSizes,
    ThemeProvider,
} from "@mui/material";
import { themes } from "src/lib/themes";
//type Operand = (number | Equation) | null;
//type Operands = [Operand, Operand];
type math = string | number;
type maths = math[];
type Equations = math | math[];
type operator = "^" | "*" | "/" | "+" | "-" | undefined;

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
let nextId: number = 0;

const CalcButtons = () => {
    let loaded: boolean = false;
    let [firstMount, setFirstMount] = useState(true);
    let lastMount: boolean = false;
    const [disp, setDisp] = useState("");

    const [history, setHistory] = useState<string[]>([]);
    const [operation, setOperation] = useState("");
    const storage = sessionStorage.getItem("calcHistory")?.split(",");
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
        if (firstMount) {
            const storageStr = sessionStorage.getItem("calcHistory");
            const calcStorage = storageStr?.split(",");
            if (calcStorage) {
                setHistory([...calcStorage]);
            }

            setFirstMount(false);
        }
    }, [history]);
    if (!firstMount) {
        sessionStorage.setItem("calcHistory", history.join());
    }

    const calcDispTheme = createTheme();
    calcDispTheme.typography.h1 = {
        fontSize: "1.2rem",
        "@media (min-width:600px)": {
            fontSize: "1.5rem",
        },
        [calcDispTheme.breakpoints.up("md")]: {
            fontSize: "2.4rem",
        },
    };

    return (
        <div className="calcContainer">
            <div className="calcUnitContainer">
                <Paper className="calcDisplay" elevation={1}>
                    <ThemeProvider theme={calcDispTheme}>
                        <h1>{disp}</h1>
                    </ThemeProvider>
                </Paper>
                <div className="calcButtonsWrapper">
                    {calcButtons.map((button) => {
                        return (
                            <Button
                                key={button.key}
                                variant="contained"
                                className="calcButton"
                                onClick={() => handleClick(button.text)}
                            >
                                <div className="calcButtonText">
                                    {button.text}
                                </div>
                            </Button>
                        );
                    })}
                </div>
            </div>
            <Paper className="calcHistory">
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
            </Paper>
        </div>
    );
};

export default function Calculator() {
    return <CalcButtons />;
}
