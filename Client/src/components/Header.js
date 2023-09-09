import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Logo } from "../utils/Data";
import { CgProfile } from "react-icons/cg";
import { FaBars } from "react-icons/fa";
import { SlBag } from "react-icons/sl";
import { CiSearch } from "react-icons/ci";
import { RiLogoutBoxRLine } from "react-icons/ri";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider";
import { useLocation } from "react-router-dom";

function Header() {
  const [userId, setUserId] = useState("");
  const location = useLocation();
  const path = location.pathname;
  const [isActive, setIsActive] = useState(false);
  const [carts, setCarts] = useState([]);
  const [cartsLen, setCartsLen] = useState(0);
  const {
    setUser,
    setToken,
    token,
    setActiveSearch,
    activeSearch,
  } = useStateContext();

  useEffect(() => {
    const storedUser = localStorage.getItem("User");
    const userObject = JSON.parse(storedUser);
    if (userObject) {
      setUserId(userObject._id);
    }
    handlCarts(userId);
  }, [userId]);

  const handlCarts = async () => {
    try {
      if (userId !== "") {
        axiosClient
          .get(`/carts/${userId}`)
          .then(({ data }) => {
            setCarts(data.data);
            setCartsLen(carts.length);
          })
          .catch((err) => {
            const response = err.response;
            console.log(response);
          });
      }
    } catch (error) {
      console.error(error);
      const response = error.response;
      console.log(response);
    }
  };
  const handleLogout = async () => {
    try {
      setUser(null);
      setToken(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div id="preloder">
        <div className="loader"></div>
      </div>

      <div
        className={`${isActive ? "active" : ""} offcanvas-menu-overlay `}
      ></div>
      <div className={`${isActive ? "active" : ""} offcanvas-menu-wrapper `}>
        <div className="offcanvas__close" onClick={() => setIsActive(false)}>
          +
        </div>
        {userId ? (
          <ul className="offcanvas__widget">
            <li>
              <CiSearch className="icon_search search-switch" size={25} />
            </li>
            <li>
              <a href="#">
                <SlBag size={20} />
                <div className="tip">{cartsLen}</div>
              </a>
            </li>
            <li>
              <a href="/profile">
                <CgProfile size={25} />
              </a>
            </li>
          </ul>
        ) : (
          <></>
        )}
        <div className="offcanvas__logo">
          <a href="./index.html">
            <img src={Logo} alt="" />
          </a>
        </div>
        <div id="mobile-menu-wrap">
          <div className="slicknav_menu">
            <a
              href="#"
              aria-haspopup="true"
              role="button"
              tabindex="0"
              className="slicknav_btn slicknav_collapsed"
            >
              <span className="slicknav_menutxt">MENU</span>
              <span className="slicknav_icon">
                <span className="slicknav_icon-bar"></span>
                <span className="slicknav_icon-bar"></span>
                <span className="slicknav_icon-bar"></span>
              </span>
            </a>
            <nav
              className="slicknav_nav slicknav_hidden"
              aria-hidden="true"
              role="menu"
            >
              <ul>
                <li className="active">
                  <a href="/" role="menuitem">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/shop" role="menuitem">
                    Shop
                  </a>
                </li>
                <li>
                  <a href="/about" role="menuitem">
                    About
                  </a>
                </li>
                <li>
                  <a href="/contact" role="menuitem">
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="offcanvas__auth">
          {userId ? (
            <a href="#">
              <RiLogoutBoxRLine size={25} onClick={handleLogout} />
            </a>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/sign_up">Register</Link>
            </>
          )}
        </div>
      </div>

      <header className="header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-3 col-lg-2">
              <div className="header__logo">
                <a href="/">
                  <img src={Logo} alt="" />
                </a>
              </div>
            </div>
            <div className="col-xl-6 col-lg-7">
              <nav className="header__menu">
                <ul>
                  <li className={path === "/" ? "active" : ""}>
                    <a href="/">Home</a>
                  </li>
                  <li className={path === "/shop" ? "active" : ""}>
                    <a href="/shop">Shop</a>
                  </li>
                  <li className={path === "/about" ? "active" : ""}>
                    <a href="/about">About</a>
                  </li>
                  <li className={path === "/contact" ? "active" : ""}>
                    <a href="/contact">Contact</a>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="col-lg-3">
              <div className="header__right">
                {!token ? (
                  <div className="header__right__auth">
                    <Link to="/login">Login</Link>
                    <Link to="/sign_up">Register</Link>
                  </div>
                ) : (
                  <ul className="header__right__widget">
                    <li onClick={() => setActiveSearch(!activeSearch)}>
                      <CiSearch
                        className="icon_search search-switch"
                        size={25}
                      />
                    </li>

                    <li>
                      <a href="/cart">
                        <SlBag size={20} />
                        <div className="tip">{cartsLen}</div>
                      </a>
                    </li>
                    <li>
                      <a href="/profile">
                        <CgProfile size={25} />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <RiLogoutBoxRLine size={25} onClick={handleLogout} />
                      </a>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
          <div className="canvas__open">
            <FaBars
              className="fa fa-bars pb-[5px]"
              onClick={() => setIsActive(true)}
            />
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
