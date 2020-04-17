# NOMAD REACT HOOK Lecture

# 1.0 Introduction to useState

```js
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
```

# 1.1 useInput

```js
const useInput = (initialState) => {
  const [value, setValue] = useState(initialState);
  const onChange = (e) => {
    console.log(e.target.value);
    setValue(e.target.value);
  };
  return { value, onChange };
};
const Hook2 = () => {
  const name = useInput("Mr.");
  return (
    <>
      <div>HI</div>
      <input placeholder="" {...name}></input>
    </>
  );
};
```

# 1.2 useInput part Two

```js
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
```

# 1.3 useTabs

```js
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
        <button onClick={() => sectionTab.setIdx(i)}>{e.title}</button>
      ))}
      <div>{sectionTab.data.content}</div>
    </>
  );
};
```

# 2 useEffect

- useEffect : 무조건 실행되는 사이드 이팩트 | 한번만 실행되는 사이드 이펙트 | 특정 변수가 바뀌면 실행되는 이펙트
- 코드는 위에서 아래로 실행된다. | useEffect가 추적하는 변수가 useEffect 코드아래에 있다면 무용지물
- 랜더링 큐에 한번에 모았다가 실행된다.3

```js
useEffect(() => {
  console.log("cnt Changed");
});

useEffect(() => {
  console.log("cnt Changed");
}, []);

useEffect(() => {
  console.log("cnt Changed");
}, [cnt]);

useEffect(() => {
  D.addEventLisenter("click", e);
  return () => {
    D.removeEventLisenter("click", e);
  };
}, [D]);
```

# 2.1 useTitle

```js
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
```

# 2.2 useClick

- useRef 는 getElementById해서 가져온 태그핸들러와 비슷하다.

```js
const Hook7 = () => {
  const nameInputRef = useRef();
  setTimeout(() => nameInputRef.current && nameInputRef.current.focus(), 1000);
  return (
    <div>
      <input ref={nameInputRef} placeholder="name"></input>
    </div>
  );
};
```

# 2.3 useConfirm & usePreventLeave

```js
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
```

# 2.4 useBeforeLeave

- useConfirm, 특정 함수 시작전에 확인 받기

```js
//특정함수를 실행하기 전에, 확인 메시지를 던지기
const useConfirm = (message, onConfirm, onCancel) => {
  if (!onConfirm || typeof onConfirm !== "function") {
    return;
  }
  if (onCancel && typeof onCancel !== "function") {
    return;
  }
  const confirmAction = () => {
    if (window.confirm("message")) {
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
```

- 창 닫기전에 확인

```js
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
```

```js
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
```

# 2.5 useFadeIn & useNetwork

- useFadeIn

```js
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
```

# 2.6 useScroll & useFullscreen

```js
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
```

# 2.7 useNotification

# 2.8 useAxios

# 2.9 Conclusions

[https://reactjs.org/docs/hooks-faq.html#how-can-i-do-data-fetching-with-hooks](https://reactjs.org/docs/hooks-faq.html#how-can-i-do-data-fetching-with-hooks)

- 훅 규칙 볼것!!

## useEffect에서 여러번 setState를 하면 발생하는 문제

- useEffect의 랜더링 사이클 이해 아직 X
- try 에서 data를 가져오고, setState로 data를 저장하는 순간, useEffect 구문에서 비동기적으로 랜더링이 됨 ( data가 잘 들어옴 )
- finally 에서 loading을 false로 바꾸는 순간, 원래 data가 없던 초기상태의 state에 loading만 false로 랜더링이 한번 더 되는듯.

- 문제의 코드

```js
const useAxios = (opts, axiosInstance = defaultAxios) => {
  const [state, setState] = useState({
    loading: true,
    erorr: false,
    data: null,
  });
  const [trigger, setTrigger] = useState(false);

  const triggerRefectch = () => {
    setTrigger(!trigger);
    setState({ ...state, loading: true });
  };

  useEffect(async () => {
    try {
      const { data } = await axiosInstance(opts);
      console.log("useEFFECT try : ");
      console.log(state);
      console.log(data);
      setState({ ...state, data });
    } catch (error) {
      setState({ error: true });
    } finally {
      //setState({ loading: false });
      console.log("useEFFECT finally : ");
      console.log(state);
    }
  }, []);

  return { ...state, triggerRefectch };
};
```

- 니코쌤 코드

```js
const useAxios = (opts, axiosInstance = defaultAxios) => {
  const [state, setState] = useState({
    loading: true,
    erorr: false,
    data: null,
  });
  const [trigger, setTrigger] = useState(false);

  const triggerRefectch = () => {
    setTrigger(!trigger);
    setState({ ...state, loading: true });
  };

  useEffect(async () => {
    axiosInstance(opts)
      .then((data) => {
        setState({
          ...state,
          loading: false,
          data,
        });
      })
      .catch((error) => {
        setState({ ...state, loading: false, error });
      });
  }, []);

  return { ...state, triggerRefectch };
};
```

# 2.10 Publishing to NPM

- try React Helmet component like ~~

# 2.11 What to Learn Next

# ------------------------------------------------------------------------------------------

# 9.1 Context and State Management (8:59)

- 유저의 프로필,이메일 정보가 필요해, 메인화면,상세화면 등 > 매번 API을 호출할수는 없다.
- 엄청큰 컴포넌트(모두를 감싸는)를 만들고, 하위 라우팅을 만든다. 정보를 가져오기만 하면 상관없다.
- 하지만, 정보를 수정한다면, 문제가 발생한다. 상위 컴포넌트는 점점커지고, Redux의 필요성이 생긴다.

- 만약, 컴포넌트가 많아진다고 생각해봐라. 헤더에 유저의 정보가 있다면 >
- 데이터 가져오는 컴포넌트 > 헤더 컴포넌트 > 유저 정보 컴포넌트 ... : 등의 순서로 온다면
- 유저 정보 컴포넌트로 props를 보내기위해 다른 컴포넌트가 쓰지도 않을 데이터를 가지고 있는건 낭비다.

- 데이터 하우스를 하나 만들어서, 유저 이메일, 유저 프로필을 저장해놔
- 특정 컴포넌트가 해당 데이터가 필요할떄마다 가져오면 해결되지.
- 이런 저장소는 리덕스,몸엑스,UseContext 가 될 수 있다. ( 여러가지 방법이 있어.)

- UseContext는 보다 심플한 상태관리에서 파워풀 하고
- Redux는 좀 더 커다란 Statesㄹ와 많은 변화들이 있을때 적합하다고 본다.

# 9.2 useContext in Action (12:33)

```js
import React, { useState } from "react";

//여러군대에서 사용예정
//const { user, logUserIn, logUserOut } = useContext(UserContext); 이렇게
export const UserContext = React.createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({ name: "Dosimpact", loggedIn: false });
  const logUserIn = () => setUser({ ...user, loggedIn: true });
  const logUserOut = () => setUser({ ...user, loggedIn: false });
  return (
    <UserContext.Provider value={{ user, logUserIn, logUserOut }}>
      {children}
    </UserContext.Provider>
  );
};

//한번만 상위 컴포넌트에서 선언 될 예정
export default UserContextProvider;
```

```js
const Hook18 = () => {
  return (
    <UserContextProvider>
      <Screen />
    </UserContextProvider>
  );
};

const Screen = () => {
  return <Header />;
};

const Header = () => {
  const { user, logUserIn, logUserOut } = useContext(UserContext);
  return (
    <>
      <div>Hello {user.name}</div>
      <button onClick={logUserIn}>Login</button>
      <button onClick={logUserOut}>LogOut</button>
      <div>You are in {user.loggedIn ? "Log in " : "Log Out"}</div>
    </>
  );
};
```

# 9.3 Recap and Improvements (7:06)

```js
import React, { useState, useContext } from "react";

//여러군대에서 사용예정
//const { user, logUserIn, logUserOut } = useContext(UserContext); 이렇게
export const UserContext = React.createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({ name: "Dosimpact", loggedIn: false });
  const logUserIn = () => setUser({ ...user, loggedIn: true });
  const logUserOut = () => setUser({ ...user, loggedIn: false });
  return (
    <UserContext.Provider value={{ user, Fns: { logUserIn, logUserOut } }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const { user } = useContext(UserContext);
  return user;
};

export const useUserFns = () => {
  const { Fns } = useContext(UserContext);
  return Fns;
};

//한번만 상위 컴포넌트에서 선언 될 예정
export default UserContextProvider;
```

```js
import UserContextProvider, {
  UserContext,
  useUser,
  useUserFns,
} from "./context";

const Hook18 = () => {
  return (
    <UserContextProvider>
      <Screen />
    </UserContextProvider>
  );
};

const Screen = () => {
  return <Header />;
};

const Header = () => {
  // const { user, logUserIn, logUserOut } = useContext(UserContext);
  const userData = useUser();
  const userFns = useUserFns();
  return (
    <>
      <div>Hello {userData.name}</div>
      <button onClick={userFns.logUserIn}>Login</button>
      <button onClick={userFns.logUserOut}>LogOut</button>
      <div>You are in {userData.loggedIn ? "Log in " : "Log Out"}</div>
    </>
  );
};
```

# 9.4 Building Hypertranslate part One (10:13)

# 9.5 Building Hypertranslate part Two (5:40)

# 9.6 Understanding useReducer (8:55)

# 9.7 Reducer Recap (6:59)

# 9.8 Adding To Dos (8:27)

# 9.9 Deleting To Dos (7:37)

# 9.10 Completing To Dos (9:23)

# 9.11 Uncompleting To Dos (4:33)

# 9.12 Refactoring with Context (9:28)

# 9.13 Refactoring with Context part Two (10:35)

# 9.14 Conclusions (1:28)

# 리액트 훅 챌린지 - GeoLocation

- 문제 순수 JS 로직으로만 간다면 리랜더링이 없다. ( 실제론 위치정보 잘 받아왔지만, 화면에 그리질 못함.)

```js
import { useState, useEffect } from "react";

export default () => {
  let state = { coords: { lat: null, long: null }, error: null };
  const succ = (pos) => {
    const { latitude: lat, longitude: long } = pos.coords;
    console.log(pos.coords);
    state = { ...state, coords: { lat, long } };
  };
  const error = (err) => {
    state = { ...state, error: true };
  };
  navigator.geolocation.getCurrentPosition(succ, error);
  return state;
};
```

- 일딴 state를 통해, 만들었다. DOM 이 바뀐부분만 랜더링 한다 했으니, 현재 위치가 고정된 이상, 무한 랜더링이 될까? ( 실제 > 무한 랜더링 중 ...)

```js
import { useState } from "react";

export default () => {
  //const [updated, setUpdated] = useState(false);
  const [state, setState] = useState({
    coords: { lat: null, long: null },
    error: null,
  });

  const succ = (pos) => {
    const { latitude: lat, longitude: long } = pos.coords;
    setState({ ...state, coords: { lat, long } });
  };
  const error = (err) => {
    setState({ ...state, error: true });
  };
  const fetchData = () => {
    navigator.geolocation.getCurrentPosition(succ, error);
  };
  fetchData();
  return state;
};
```

- useEffect를 사용해서, 무한 랜더링은 막았지만, Effect 한테 거짓말을 했음.
- fetchDtat함수는 매 랜더링 마다 바뀌는데, 안바뀐다고 얘기함.

```js
import { useState, useEffect } from "react";

export default () => {
  //const [updated, setUpdated] = useState(false);
  const [state, setState] = useState({
    coords: { lat: null, long: null },
    error: null,
  });

  const succ = (pos) => {
    const { latitude: lat, longitude: long } = pos.coords;
    setState({ ...state, coords: { lat, long } });
  };
  const error = (err) => {
    setState({ ...state, error: true });
  };
  const fetchData = () => {
    navigator.geolocation.getCurrentPosition(succ, error);
  };
  //fetchData();
  useEffect(() => {
    fetchData();
  }, []);
  return state;
};
```

- 의존성 완전 제거

```js
import { useState, useEffect } from "react";

export default () => {
  const [state, setState] = useState({
    coords: { lat: null, long: null },
    error: null,
  });

  useEffect(() => {
    const succ = (pos) => {
      const { latitude: lat, longitude: long } = pos.coords;
      setState((pre) => ({ ...pre, coords: { lat, long } }));
    };
    const error = (err) => {
      setState((pre) => ({ ...pre, error: true }));
    };
    navigator.geolocation.getCurrentPosition(succ, error);
  }, []);
  return state;
};
```

- 카운터

```js
//마법의 useEffect가 안끝나는 현상...
const Counter = () => {
  const [cnt, setCnt] = useState(0);
  useEffect(() => {
    console.log("Effect is running");
    const id = setInterval(() => {
      setCnt((c) => {
        console.log("COUTER UPDATE", c);
        return c + 1;
      });
    }, 1000);
    return () => {
      console.log("EFFECT IS CLEARED");
      clearInterval(id);
    };
  }, []);
  return <>{cnt}</>;
};

const Couter02 = () => {
  const [cnt, setCnt] = useState(0);
  useEffect(() => {
    console.log("Effect is running");
    const id = setInterval(() => {
      console.log("COUTER UPDATE", cnt);
      setCnt(cnt + 1);
    }, 1000);
    return () => {
      console.log("EFFECT IS CLEARED");
      clearInterval(id);
    };
  }, [cnt]);

  return <>{cnt}</>;
};

const Couter03 = () => {
  const [cnt, setCnt] = useState(0);
  const [step, setStep] = useState(1);

  useEffect(() => {
    console.log("use Effect start");
    const id = setInterval(() => {
      setCnt((c) => {
        console.log("COUTER UPDATE", c);
        return c + step;
      });
    }, 1000);
    return () => {
      clearInterval(id);
      console.log("use Effect cleanUp");
    };
  }, [step]);

  return (
    <>
      <div>{cnt}</div>
      <input value={step} onChange={(e) => setStep(Number(e.target.value))} />
    </>
  );
};
```

- 이렇게 만들었더니, map 안의 모든 컴포넌트를 재 랜더링 하더라.

```js
function App() {
  const titles = [
    { title: "useDeviceOrientation", JSXElemnet: Hook01 },
    { title: "useFavicon", JSXElemnet: Hook02 },
    { title: "useGeolocation", JSXElemnet: Hook03 },
    { title: "useKeyPress", JSXElemnet: Hook04 },
    { title: "useLocalStorage", JSXElemnet: Hook05 },
    { title: "useMousePosition", JSXElemnet: Hook06 },
    { title: "useOnline", JSXElemnet: Hook07 },
  ];
  return (
    <div className="App">
      <h1>Super Hooks !</h1>
      {titles.map((e, i) => (
        <Section title={e.title}>{e.JSXElemnet()}</Section>
      ))}
    </div>
  );
}
```

- useEffect 랑 바닐라변수를 쓴다면??? , 변수를 전혀 바꿀 수 없다.

```js
import { useState, useEffect } from "react";

export default () => {
  let pos = { x: 0, y: 0 };
  const [state, setState] = useState({ x: 0, y: 0 });
  const [lock, setLock] = useState(false);

  const lockScroll = () => {
    console.log("lock");
    setLock(true);
  };
  const unlockScroll = () => {
    setLock(false);
  };

  useEffect(() => {
    const handleChange = (e) => {
      if (lock) {
        console.log(`is Lock ${lock}`);
        window.scrollTo(pos.x, pos.y);
      } else {
        pos = { x: window.scrollX, y: window.scrollY };
        console.log(`scrolled ${pos.x} ,${pos.y}`);
      }
    };
    window.addEventListener("scroll", handleChange);
    return () => {
      window.removeEventListener("scroll", handleChange);
    };
  }, [lock]);

  return [lock, { lockScroll, unlockScroll }];
};
```

# 리액트 훅 챌린지 정리

```js
import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import {
  useDeviceOrientation,
  useFavicon,
  useGeolocation,
  useKeyPress,
  useLocalStorage,
  useMousePosition,
  useOnline,
  useLockScroll,
} from "./hooks";

const Section = ({ title, children }) => {
  return (
    <>
      <div>{title}</div>
      {children}
    </>
  );
};

function App() {
  // const titles = [
  //   { title: "useDeviceOrientation", JSXElemnet: Hook01 },
  //   { title: "useFavicon", JSXElemnet: Hook02 },
  //   { title: "useGeolocation", JSXElemnet: Hook03 },
  //   { title: "useKeyPress", JSXElemnet: Hook04 },
  //   { title: "useLocalStorage", JSXElemnet: Hook05 },
  //   { title: "useMousePosition", JSXElemnet: Hook06 },
  //   { title: "useOnline", JSXElemnet: Hook },
  // ];
  return (
    <div className="App">
      {/* <h1>Super Hooks !</h1>
      {titles.map((e, i) => (
        <Section title={e.title}>{e.JSXElemnet()}</Section>
      ))} */}

      <Section title={"useDeviceOrientation"}>
        <Hook01 />
      </Section>
      <Section title={"useFavicon"}>{Hook02()}</Section>
      <Section title={"useGeolocation"}>
        <Hook03 />
      </Section>
      <Section title={"useKeyPress"}>
        <Hook04 />
      </Section>
      <Section title={"useKeyPress"}>
        <Hook05 />
      </Section>
      <Section title={"useMousePosition"}>
        <Hook06 />
      </Section>
      <Section title={"useOnline"}>
        <Hook07 />
      </Section>
      <Section title={"useLockScroll"}>
        <Hook08 />
      </Section>
    </div>
  );
}

const Hook01 = () => {
  const { alpha, beta, gamma } = useDeviceOrientation();
  return (
    <ul>
      <li>alpha: {alpha}</li>
      <li>beta: {beta}</li>
      <li>gamma: {gamma}</li>
    </ul>
  );
};

const Hook02 = () => {
  const setFavicon = useFavicon("https://www.google.com/favicon.ico");

  return (
    <>
      <button onClick={() => setFavicon("https://facebook.com/favicon.ico")}>
        change favicon
      </button>
    </>
  );
};

const Hook03 = () => {
  const {
    coords: { lat, long },
    error,
  } = useGeolocation();
  // console.log(lat, long);
  return (
    <ul>
      <li>Latitude: {lat}</li>
      <li>Longitude: {long}</li>
      <li>GeoLocation error: {error === null ? "null" : "error"}</li>
    </ul>
  );
};

const Hook04 = () => {
  const kPressed = useKeyPress("k");
  const iPressed = useKeyPress("i");
  const mPressed = useKeyPress("m");
  const cPressed = useKeyPress("c");
  const hPressed = useKeyPress("h");
  return (
    <ul>
      <li>kPressed: {kPressed && "k"}</li>
      <li>iPressed: {iPressed && "i"}</li>
      <li>mPressed: {mPressed && "m"}</li>
      <li>cPressed: {cPressed && "c"}</li>
      <li>hPressed: {hPressed && "h"}</li>
      <li>iPressed: {iPressed && "i"}</li>
    </ul>
  );
};

const Hook05 = () => {
  const [currentLS, setLS] = useLocalStorage("JWT", "1234");

  return (
    <>
      <ul>
        <li>
          <div>Current Value: {currentLS}</div>
          <div>
            <button onClick={() => setLS("1234")}>Set value: 1234</button>
            <button onClick={() => setLS(null)}>Clear LS</button>
          </div>
        </li>
      </ul>
    </>
  );
};

const Hook06 = () => {
  const { x, y } = useMousePosition();
  return (
    <>
      <ul>
        <li>Mouse X: {x}</li>
        <li>Mouse Y: {y}</li>
      </ul>
    </>
  );
};

const Hook07 = () => {
  const isOnline = useOnline();
  return (
    <>
      <div>Are we online ? {isOnline ? "YES" : "NO"}</div>
    </>
  );
};
const Hook08 = () => {
  const [isLocked, { lockScroll, unlockScroll }] = useLockScroll();
  return (
    <>
      <div>is Locked ? {isLocked ? "YES" : "NO"}</div>
      <button onClick={() => lockScroll()}>lockScroll</button>
      <button onClick={() => unlockScroll()}>unlockScroll</button>
    </>
  );
};
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

```js
export { default as useDeviceOrientation } from "./useDeviceOrientation";
export { default as useFavicon } from "./useFavicon";
export { default as useGeolocation } from "./useGeolocation";
export { default as useKeyPress } from "./useKeyPress";
export { default as useLocalStorage } from "./useLocalStorage";
export { default as useMousePosition } from "./useMousePosition";
export { default as useOnline } from "./useOnline";
export { default as useLockScroll } from "./useLockScroll";
```

- useDeviceOrientation

```js
import { useState, useEffect } from "react";

export default () => {
  const [state, setState] = useState({ alpha: null, beta: null, gamma: null });

  useEffect(() => {
    const handleOri = (e) => {
      setState({
        alpha: e.alpha,
        beta: e.beta,
        gamma: e.gamma,
      });
    };
    window.addEventListener("deviceorientation", handleOri, true);
    return () => {
      window.removeEventListener("deviceorientation", handleOri, true);
    };
  }, []);

  return { ...state };
};
```

- useFavicon

```js
export default (url) => {
  const setFavicon = (url) => {
    const El = document.querySelector("link#favicon");
    if (El && El.href) {
      El.href = url;
    }
  };
  setFavicon(url);
  return setFavicon;
};
```

- useFavicon - nico

```js
import { useEffect } from "react";

export function useFavicon(initialFavicon) {
  const setFavicon = (href) => {
    const link =
      document.querySelector("link[rel*='icon']") ||
      document.createElement("link");
    link.rel = "shortcut icon";
    link.href = href;
    const [head] = document.getElementsByTagName("head");
    head.appendChild(link);
  };
  useEffect(() => {
    setFavicon(initialFavicon);
  }, [initialFavicon]);
  return setFavicon;
}
```

- useGeolocation

```js
import { useState, useEffect } from "react";

export default () => {
  const [state, setState] = useState({
    coords: { lat: null, long: null },
    error: null,
  });

  useEffect(() => {
    const succ = (pos) => {
      const { latitude: lat, longitude: long } = pos.coords;
      setState((pre) => ({ ...pre, coords: { lat, long } }));
    };
    const error = (err) => {
      setState((pre) => ({ ...pre, error: true }));
    };
    navigator.geolocation.getCurrentPosition(succ, error);
  }, []);
  return state;
};
```

- useKeyPress

```js
import { useState, useEffect } from "react";

export default (i) => {
  const [key, setKey] = useState(false);
  useEffect(() => {
    const keyDownHandler = (e) => {
      const keyName = e.key;
      if (keyName === i) {
        setKey(() => true);
      }
    };
    const keyUpHandler = (e) => {
      const keyName = e.key;
      if (keyName === i) {
        setKey(() => false);
      }
    };
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    return () => {
      document.removeEventListener("keydown", keyDownHandler, false);
      document.removeEventListener("keyup", keyUpHandler, false);
    };
  }, [i]);
  return key;
};
```

- useLocalStorage

```js
import { useState } from "react";
//key 이름과, 초기값을 지정해 준다.
//반환으로 현재 key에 대응하는 value값을 주고, 변경할수 있는 함수 제공
export default (key, initalValue) => {
  const [value, setValue] = useState(initalValue);

  const setLS = (nValue) => {
    localStorage.setItem(key, nValue);
    setValue(nValue);
  };

  return [value, setLS];
};
```

- useLocalStorage - nico

```js
import { useState } from "react";

export function useLocalStorage(name, initialValue) {
  const [currentValue, changeValue] = useState(() => {
    try {
      const item = localStorage.getItem(name);
      return item ? JSON.parse(item) : initialValue;
    } catch (e) {
      return initialValue;
    }
  });

  const updateValue = (newValue) => {
    try {
      changeValue(newValue);
      localStorage.setItem(name, JSON.stringify(newValue));
    } catch (e) {
      console.log(e);
    }
  };
  return [currentValue, updateValue];
}
```

- useMousePosition

```js
import { useState, useEffect } from "react";

export default () => {
  const [state, setState] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mouseMoveH = (e) => {
      // console.log(`
      // Screen X/Y: ${e.screenX}, ${e.screenY}
      // Client X/Y: ${e.clientX}, ${e.clientY}`);
      if (e.clientX && e.clientY) {
        setState({ x: e.clientX, y: e.clientY });
      }
    };
    document.addEventListener("mousemove", mouseMoveH);
    return () => {
      console.log("EFFECT CLEARED");
      document.removeEventListener("mousemove", mouseMoveH);
    };
  }, []);

  return state;
};
```

- useOnline

```js
import { useState, useEffect } from "react";

export default () => {
  const [state, setState] = useState(navigator.onLine);

  useEffect(() => {
    const handleChange = () => {
      setState(navigator.onLine);
    };
    window.addEventListener("online", handleChange);
    window.addEventListener("offline", handleChange);
    return () => {
      window.removeEventListener("online", handleChange);
      window.removeEventListener("offline", handleChange);
    };
  }, []);

  return state;
};
```

- useLockScroll

```js
import { useState, useEffect } from "react";

export default () => {
  //let pos = { x: 0, y: 0 };
  const [state, setState] = useState({ x: 0, y: 0 });
  const [lock, setLock] = useState(false);

  const lockScroll = () => {
    console.log("lock");
    setLock(true);
  };
  const unlockScroll = () => {
    setLock(false);
  };

  useEffect(() => {
    const handleChange = (e) => {
      if (lock) {
        window.scrollTo(state.x, state.y);
      } else {
        setState({ x: window.scrollX, y: window.scrollY });
        //  console.log(`scrolled ${state.x} ,${state.y}`);
      }
    };
    window.addEventListener("scroll", handleChange);
    return () => {
      window.removeEventListener("scroll", handleChange);
    };
  }, [lock]);

  return [lock, { lockScroll, unlockScroll }];
};
```

- useLockScroll -nico

```js
import { useState } from "react";

export function useLockScroll() {
  const [initialScroll] = useState(document.body.style.overflow);
  const [isLocked, setIsLocked] = useState(false);
  const lockScroll = () => {
    document.body.style.overflow = "hidden";
    setIsLocked(true);
  };
  const unlockScroll = () => {
    document.body.style.overflow = initialScroll;
    setIsLocked(false);
  };
  return [isLocked, { lockScroll, unlockScroll }];
}
```
