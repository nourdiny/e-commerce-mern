import React, { useState } from "react";
import {useStateContext} from "../context/ContextProvider.jsx";
import axiosClient from "../axios-client.js";
import { ImgLogin } from "../utils/Data";
import { useNavigate } from 'react-router-dom';

function Login() {
  const { setUser, setToken } = useStateContext()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const payload = {
        "email": email,
        "password": password
      }
      console.log(payload)
      axiosClient.post('/login', payload)
      .then(({data}) => {
        setUser(data.user)
        setToken(data.token , data.user);

        navigate('/');
      })
      .catch((err) => {
        const response = err.response;
        console.log(response);
        setMessage(response.data.message)
      });
    } catch (error) {
      console.error(error);
      const response = error.response;
      console.log(response);
      setMessage(response.data.message)

        
    }
  };


  return (
    <section className="contact spad ">
      <div className="container flex justify-center items-center">
        <div className="rounded-[20px] truncate   h-[60vh] w-[800px]  flex justify-center items-center gap-[5%]">
          <div
            className="h-full bg-center bg-cover	 bg-no-repeat	min-w-[45%] max-sm:hidden sm:block"
            style={{ backgroundImage: `url('${ImgLogin}')` }}
          ></div>
          <div className="contact__form min-w-[50%] pr-[10px]">
            <h5>Login</h5>
            <p className="mb-[10px] bg-[red]">
                {message}
            </p>
            <div action="" className="grid">
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="mb-[10px]">Forget My Password ?</p>
              <button
                onClick={handleLogin}
                className="block site-btn bg-[#ca1515] w-[50%]"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
