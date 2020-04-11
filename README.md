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

# 1.2 useInput part Two

# 1.3 useTabs

# 2 useEffect

# 2.0 Introduction to useEffect

# 2.1 useTitle

# 2.2 useClick

# 2.3 useConfirm & usePreventLeave

# 2.4 useBeforeLeave

# 2.5 useFadeIn & useNetwork

# 2.6 useScroll & useFullscreen

# 2.7 useNotification

# 2.8 useAxios

# 2.9 Conclusions

# 2.10 Publishing to NPM

# 2.11 What to Learn Next
