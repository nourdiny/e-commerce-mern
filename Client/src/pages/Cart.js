import React, { useEffect, useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import CartOne from "../components/CartOne";
import {AiOutlineClear} from 'react-icons/ai';
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client.js";

function Cart() {
  const [userId , setUserId] = useState('')
  const [total , setTotal] = useState(0)
  const { cart, setCart   } = useStateContext();

  useEffect(() => {
    const storedUser = localStorage.getItem("User");  
    const userObject = JSON.parse(storedUser);
    if (userObject) {
        setUserId(userObject._id);
      } 
    console.log("userId : " , userId);
    handlCarts(userId);
    handlTotal(userId);
  }, [userId]);

  const handlCarts = async (userId) => {
    try {
        if(userId !== ''){
            axiosClient
            .get(`/carts/${userId}`) // Update the URL to include userId
            .then(({ data }) => {
              setCart(data.data);
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
  const handlTotal = async (userId) => {
    try {
      if(userId !== ''){
      axiosClient
        .get(`/total-carts/${userId}`)
        .then(({ data }) => {
          setTotal(data.sum);
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

  const ClearCartItem = async (userId) => {
    try {
      if (userId !== "") {
        axiosClient.delete(`/clear-cart/${userId}`)
        .then(({data})=>{
          console.log(data);
          window.location.reload()
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

  return (
    <>
      <Breadcrumb path={["Shopping cart"]} />
      <section className="shop-cart spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="shop__cart__table">
                <table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item, index) => {
                      return (
                        <CartOne item={item} key={index}/>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="cart__btn">
                <a href="/shop">Continue Shopping</a>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="cart__btn update__btn">
                <a  className="cursor-pointer" onClick={()=> ClearCartItem(userId)}>
                  <span className="relative " >
                    <AiOutlineClear className="absolute -left-[20px] text-[18px]"/>
                    </span> Clear cart
                </a>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="discount__content">
                <h6>Discount codes</h6>
                <form action="#">
                  <input type="text" placeholder="Enter your coupon code" />
                  <button type="submit" className="site-btn bg-[#ca1515]">
                    Apply
                  </button>
                </form>
              </div>
            </div>
            <div className="col-lg-4 offset-lg-2">
              <div className="cart__total__procced">
                <h6>Cart total</h6>
                <ul>
                  <li>
                    Subtotal <span>$ {total.toFixed(1)}</span>
                  </li>
                  <li>
                    Total <span>$ {total.toFixed(1)}</span>
                  </li>
                </ul>
                <a href="/checkout" className="primary-btn hover:text-[#fff]">
                  Proceed to checkout
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Cart;
