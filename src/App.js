import React, { useState, useEffect, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";

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
          <Hook4 />
        </Section>
        <Section title={"USE EFFECT"}>
          <Hook5 />
          <Hook6 />
          <Hook7 />
          <Hook8 />
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

const AJAXData = [
  {
    title: "Section-1",
    content: "This is Section - 1 Content",
  },
  {
    title: "Section-2",
    content: "This is Section - 2 Content",
  },
  {
    title: "Section-3",
    content: "This is Section - 3 Content",
  },
];
//입력 : 초기 탭인덱스/배열 데이터 : 출력 현재 콘텐츠 및 인덱스 변경함수
const useTabs = (initIdx, arrayData) => {
  const [idx, setIdx] = useState(initIdx);
  if (!Array.isArray(arrayData)) {
    return;
  }

  return { data: arrayData[idx], setIdx };
};

const Hook4 = () => {
  const sectionTab = useTabs(0, AJAXData);
  return (
    <>
      {AJAXData.map((e, i) => (
        <button key={i} onClick={() => sectionTab.setIdx(i)}>
          {e.title}
        </button>
      ))}
      <div>{sectionTab.data.content}</div>
    </>
  );
};

const Hook5 = () => {
  const [cnt, setCnt] = useState(0);
  const plus = () => setCnt(cnt + 1);
  const minus = () => setCnt(cnt - 1);
  useEffect(() => {
    console.log("cnt Changed");
  }, [cnt]);
  return (
    <>
      <div>{cnt}</div>
      <button onClick={() => plus()}>+</button>
      <button onClick={() => minus()}>-</button>
    </>
  );
};

//사이드 이펙트로 문서의 title를 변경한다.
const useTitle = (initalTitle) => {
  const [title, setTitle] = useState(initalTitle);
  useEffect(() => {
    const htmlTitle = document.querySelector("title");
    htmlTitle.innerText = title;
  }, [title]);
  return setTitle;
};

const Hook6 = () => {
  const titleUpdator = useTitle("DOSIMPACT");
  setTimeout(() => titleUpdator("BOOM!!"), 3000);
  return <></>;
};

const Hook7 = () => {
  const nameInputRef = useRef();
  setTimeout(() => nameInputRef.current && nameInputRef.current.focus(), 1000);
  return (
    <div>
      <input ref={nameInputRef} placeholder="name"></input>
    </div>
  );
};

//특정 HTML 에 > 클릭을 트리거로 > 특정 함수 실행
const useClick = (onClick) => {
  const element = useRef();
  useEffect(() => {
    const HTMLHandler = element.current;
    if (HTMLHandler) {
      HTMLHandler.addEventListener("click", onClick);
    }
    return () => {
      HTMLHandler.removeEventListener("click", onClick);
    };
  }, [onClick]);
  return element;
};

const Hook8 = () => {
  const sayHello = () => console.log("helllo");
  const title = useClick(sayHello);
  return (
    <div>
      <h2 ref={title}>TITLE</h2>
    </div>
  );
};
