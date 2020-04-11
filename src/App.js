import React from "react";
import logo from "./logo.svg";
import "./App.css";

const Hook1 = () => <div>HOOK-1</div>;

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>DOSHOOKS</h1>
        <Hook1 />
      </header>
    </div>
  );
}

export default App;
