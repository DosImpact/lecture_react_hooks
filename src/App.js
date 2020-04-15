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
        <Section title={"👍 USE EFFECT Section"}></Section>
        <Section title={"USE EFFECT Hook5"}>
          <Hook5 />
        </Section>
        <Section title={"USE EFFECT Hook6"}>
          <Hook6 />
        </Section>
        <Section title={"USE EFFECT Hook7"}>
          <Hook7 />
        </Section>
        <Section title={"USE EFFECT Hook 8"}>
          <Hook8 />
        </Section>
        <Section title={"USE EFFECT Hook 9"}>
          <Hook9 />
        </Section>
        <Section title={"USE EFFECT Hook 10"}>
          <Hook10 />
        </Section>
        <Section title={"USE EFFECT Hook 11"}>
          <Hook11 />
        </Section>
        <Section title={"USE EFFECT Hook 12"}>
          <Hook12 />
        </Section>
        <Section title={"USE EFFECT Hook 13"}>
          <Hook13 />
        </Section>
        <Section title={"USE EFFECT Hook 14 - Scroll"}>
          <Hook14 />
        </Section>
        <Section title={"USE EFFECT Hook 15 - useFullscreen"}>
          <Hook15 />
        </Section>
        <Section title={"USE EFFECT Hook 16"}>
          <Hook16 />
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
    //console.log("cnt Changed");
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
  const sayHello = (e) => console.log(e);
  const title = useClick(sayHello);
  return (
    <div>
      <h2 ref={title}>TITLE</h2>
    </div>
  );
};

//특정함수를 실행하기 전에, 확인 메시지를 던지기
const useConfirm = (message, onConfirm, onCancel) => {
  if (!onConfirm || typeof onConfirm !== "function") {
    return;
  }
  if (onCancel && typeof onCancel !== "function") {
    return;
  }
  const confirmAction = () => {
    if (window.confirm(message)) {
      onConfirm();
    } else {
      onCancel();
    }
  };
  return confirmAction;
};

const Hook9 = () => {
  const deleteWorldConfirm = () => console.log("DELETE WORLD Suc");
  const deleteWorldDelete = () => console.log("DELETE WORLD Fail");
  const confirmDelete = useConfirm(
    "Sure? ",
    deleteWorldConfirm,
    deleteWorldDelete
  );

  return (
    <div>
      <button onClick={confirmDelete}>DELETE</button>
    </div>
  );
};
//========================================================================================
const usePreventLeave = () => {
  const listener = (e) => {
    e.preventDefault();
    e.returnValue = "";
  };
  const enablePrevent = () => window.addEventListener("beforeunload", listener);
  const disablePrevent = () =>
    window.removeEventListener("beforeunload", listener);
  return { enablePrevent, disablePrevent };
};

const Hook10 = () => {
  const { enablePrevent, disablePrevent } = usePreventLeave();
  return (
    <>
      <div>
        <button onClick={enablePrevent}>Protect</button>
        <button onClick={disablePrevent}>unProtect</button>
      </div>
    </>
  );
};
const useBeforeLeave = (onBefore) => {
  // if (typeof onBefore !== "function") {
  //   return;
  // }

  useEffect(() => {
    const handle = () => {
      onBefore();
    };
    document.addEventListener("mouseleave", handle);
    return () => document.removeEventListener("mouseleave", handle);
  }, [onBefore]);
};

const Hook11 = () => {
  const beggingYou = () => console.log("please dont leave me..");
  useBeforeLeave(beggingYou);
  return <div>BEGGING</div>;
};

const useFadeIn = () => {
  const element = useRef();
  useEffect(() => {
    if (element.current) {
      const { current } = element;
      current.style.transition = `opacity 3s`;
      current.style.opacity = 1;
    }
  }, []);
  return { ref: element, style: { opacity: 0 } };
};

const Hook12 = () => {
  const titleFadein = useFadeIn();
  return (
    <>
      <h2 {...titleFadein}>DOS-IMPACT</h2>
    </>
  );
};

//=====================================================================================================

//현재의 온프 상태 / 이벤트 바인딩
const useNetwork = (onNetworkChange) => {
  const [status, setStatus] = useState(navigator.onLine);

  useEffect(() => {
    const handleChange = () => {
      setStatus(navigator.onLine);
      if (typeof onNetworkChange === "function") {
        onNetworkChange(navigator.onLine);
      }
    };
    window.addEventListener("online", handleChange);
    window.addEventListener("offline", handleChange);
    return () => {
      window.removeEventListener("online", handleChange);
      window.removeEventListener("offline", handleChange);
    };
  }, [onNetworkChange]);

  return status;
};

const Hook13 = () => {
  const onNetworkChange = (status) =>
    console.log(status ? "ON LINE " : "OFF LINE");
  const onLine = useNetwork(onNetworkChange);
  return <>{onLine ? "ON LINE" : "OFF LINE"}</>;
};

//=====================================================================================================

// 단순하게 현재의 스크롤 위치를 반환해 준다.
const useScroll = () => {
  const [state, setState] = useState({
    x: 0,
    y: 0,
  });
  const onScroll = () => {
    setState({ y: window.scrollY, x: window.scrollX });
  };
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return state;
};

const Hook14 = () => {
  const position = useScroll();
  return <>{JSON.stringify(position)}</>;
};

//=====================================================================================================

// - 풀스크린을 했다가 풀면, 원래 스크린으로 돌아왔을때, scroll y 문제가 있다.
// 콜백 함수 / 리턴 : ref,triggerfull,exitfull
const useFullScreen = (callback) => {
  const element = useRef();
  const triggerFullscreen = () => {
    if (element.current) {
      if (element.current.requestFullscreen) {
        element.current.requestFullscreen();
        callback(true);
      }
    }
  };
  const triggerexit = () => {
    document.exitFullscreen();
    if (document.exitFullscreen) {
      callback(false);
    }
  };

  return { element, triggerFullscreen, triggerexit };
};

const Hook15 = () => {
  const { element, triggerFullscreen, triggerexit } = useFullScreen((t) =>
    console.log(t ? "Full Screen Now" : "Non Full ")
  );
  return (
    <>
      <div ref={element}>
        <img src="https://smaller-pictures.appspot.com/images/dreamstime_xxl_65780868_small.jpg"></img>
        <button onClick={triggerFullscreen}>Full</button>
        <button onClick={triggerexit}>Exist</button>
      </div>
    </>
  );
};
//=====================================================================================================

const useNotification = (title, options) => {
  if (!("Notification" in window)) {
    console.log("This browser does not support desktop notification");
  }
  const [poss, setPoss] = useState(true);
  const permissionNoti = async () => {
    const res = await Notification.requestPermission();
    console.log(res);
    if (res === "granted") {
      setPoss(true);
    } else {
      setPoss(false);
    }
  };
  const triggerNoti = () => {
    console.log("tiggerNoti");
    if (poss) {
      new Notification(title, options);
    }
  };
  permissionNoti();
  return triggerNoti;
};

const Hook16 = () => {
  const triggerNoti = useNotification("you kimchi", { body: "me too" });
  return (
    <>
      <div>UseNotification</div>
      <button onClick={triggerNoti}>NOTI</button>
    </>
  );
};
