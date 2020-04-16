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
