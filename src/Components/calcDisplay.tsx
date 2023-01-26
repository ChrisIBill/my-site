import "./elements.scss";
const arr: number[] = [5, 6, 7];

const map1 = arr.map((elem) => {
  console.log(elem);
});
const Display = (disp: string) => {
  return <div className="calcDisplay">{disp}</div>;
};

export { Display };
