import React , {createContext, useContext, useState} from "react";

const StateContext = createContext({
  user: null,
  token: null,
  cart: null,
  like: null,
  activeSearch : null,
  textSearch : "",
  setUser: () => {},
  setToken: () => {},
  setActiveSearch: () => {},
  setTextSearch: () => {},
  setCart: () => {},
  setLike: () => {},
})

export const ContextProvider = ({children}) => {
  const [cart, setCart] = useState([]);
  const [like, setLike] = useState([]);
  const [activeSearch, setActiveSearch] = useState(false);
  const [textSearch , setTextSearch] = useState('');
  const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
  const [user, _setUser] = useState(localStorage.getItem('User'));

  
  const setUser = (user)=>{
    console.log(user);
    _setUser(user)
    console.log(user);
    if (user) {
      localStorage.setItem('User', JSON.stringify(user));
    }  else  {
      localStorage.removeItem('User');
    }
  }
  
  const setToken = (token) => {
    _setToken(token)
    if (token) {
      localStorage.setItem('ACCESS_TOKEN', token);
    }  else  {
      localStorage.removeItem('ACCESS_TOKEN');
    }
  }



  

  return (
    <StateContext.Provider value={{
      user,
      setUser,
      token,
      setToken,
      activeSearch,
      setActiveSearch,
      textSearch,
      setTextSearch,
      cart, 
      setCart,
      like, 
      setLike,
    }}>
      {children}
    </StateContext.Provider>
  );
}

export const useStateContext = () => useContext(StateContext);
