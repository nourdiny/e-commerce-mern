import {createBrowserRouter} from "react-router-dom";
import React  from "react";
import Layout from './components/Layout';
import DefaultLayout from './layouts/DefaultLayout';
import GuestLayout from './layouts/GuestLayout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Contact from './pages/Contact';
import About from './pages/About';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import DetailsProduct from "./pages/DetailsProduct";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        path: '/' ,
        element : <Home />
      },
    {
      path: '/',
      element: <DefaultLayout/>,
      children: [
        { 
          path : '/cart' ,
          element : <Cart />
        },{ 
          path : '/checkout' ,
          element : <Checkout />
        },{ 
          path : '/profile' ,
          element : <Profile />
        }
      ]
    },
    {
      path: '/',
      element: <GuestLayout/>,
      children: [
        
        { 
          path : '/login' ,
          element : <Login />
        },
        { 
          path : '/sign_up' ,
          element: <SignUp />
        },
        
      ]
    },
    { 
      path : '/contact' ,
      element: <Contact />
    },
    { 
      path : '/shop' ,
      element: <Shop />
    },
    { 
      path : '/product/:id' ,
      element: <DetailsProduct />
    },
    { 
      path : '/about' ,
      element: <About />
    },
    {
      path: "*",
      element: <NotFound/>
    },
]
}
])

export default router;
