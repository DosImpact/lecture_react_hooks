import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

const Section = ({ title, children }) => (
  <div>
    <h2>{title}</h2>
    {children}
  </div>
);

const Hook1 = () => {
  const [count, setCount] = useState(1);
  const plus = () => setCount(count + 1);
  const minus = () => setCount(count - 1);
  return (
    <>
      <div>{count}</div>
      <button onClick={plus}>+</button>
      <button onClick={minus}>-</button>
    </>
  );
};

const Hook2 = () => {
  const name = useInput("Mr.");
  return (
    <>
      <div>
        <input placeholder="" {...name}></input>
      </div>
    </>
  );
};
const Hook3 = () => {
  const name = useInputVaild("Mr.", (v) => v.length <= 10);
  return (
    <>
      <div>
        <input placeholder="" {...name}></input>
      </div>
    </>
  );
};
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>DOS 🛠 HOOKS</h1>
        <Section title={"USE STATE"}>
          <Hook1 />
          <Hook2 />
          <Hook3 />
        </Section>
      </header>
    </div>
  );
}

export default App;

const useInput = (initialState) => {
  const [value, setValue] = useState(initialState);
  const onChange = (e) => {
    console.log(e.target.value);
    setValue(e.target.value);
  };
  return { value, onChange };
};

const useInputVaild = (initialState, vaildator) => {
  const [value, setValue] = useState(initialState);
  const onChange = (e) => {
    let willupdate = true;
    console.log(e.target.value);
    if (typeof vaildator === "function") {
      willupdate = vaildator(e.target.value);
    }
    if (willupdate) {
      setValue(e.target.value);
    }
  };
  return { value, onChange };
};
