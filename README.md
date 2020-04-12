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

# 2.6 useScroll & useFullscreen

# 2.7 useNotification

# 2.8 useAxios

# 2.9 Conclusions

# 2.10 Publishing to NPM

# 2.11 What to Learn Next
