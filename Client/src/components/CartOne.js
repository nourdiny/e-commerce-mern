import React, { useState, useEffect } from "react";
import axiosClient from "../axios-client.js";
import {IoClose} from 'react-icons/io5';
import StarRating from './StarRating';


function CartOne(props) {
  console.log("cc : " , props.item);
  const { idItem, qty } = props.item;
  const [product, setProduct] = useState([]);
  const rating = 4;

  const handleProduct = async () => {
    try {
      if(idItem){
        axiosClient
        .get("/products")
        .then(({ data }) => {
          const filterProduct = data.filter((product) => {
            return product._id === idItem;
          });
          if (filterProduct) {
            setProduct(filterProduct);
          }
        })
        .catch((err) => {
          const response = err.response;
          console.log(response);
        });
      };
    } catch (error) {
      console.error(error);
      const response = error.response;
      console.log(response);
    }
  };

  useEffect(() => {
    handleProduct(); 
  }, [product]);



  const deleteCartItem = async (itemId) => {
    try {
      axiosClient.delete(`/cart/${itemId}`)
      .then(({data})=>{
        console.log(data);
        window.location.reload()
      })
      .catch((err) => {
        const response = err.response;
        console.log(response);
      });
    } catch (error) {
        console.error(error);
        const response = error.response;
        console.log(response);
    }
  };
  return (
    <tr>
      {product.map((item, index) => {
        return (
          <>
            <td className="cart__product__item">
              <img src={item.image} className="max-w-[100px]" alt="" />
              <div className="cart__product__item__title">
                <h6>Cotton Shirt</h6>
                <div className="rating">
                    <StarRating rating={rating} />
                </div>
              </div>
            </td>
            <td className="cart__price">{item.price}</td>
            <td className="cart__quantity">
              <div className="pro-qty">
                <input type="text" value={qty} />
              </div>
            </td>
            <td className="cart__total">${qty * parseFloat(item.price.replace('$', ''))}</td>
            <td className="cart__close">
              <span className="relative cursor-pointer" onClick={()=> deleteCartItem(item._id)}>
                <IoClose className="absolute right-[14px] top-[14px]" />
              </span>
            </td>
          </>
        );
      })}
    </tr>
  );
}

export default CartOne;
