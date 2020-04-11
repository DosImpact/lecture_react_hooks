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

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>DOS 🛠 HOOKS</h1>
        <Section title={"USE STATE"}>
          <Hook1 />
        </Section>
      </header>
    </div>
  );
}

export default App;
