import React, { useEffect, useState } from "react";
import { BsArrowsAngleExpand, BsBag } from "react-icons/bs";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider";
import StarRating from "./StarRating";
import { useNavigate } from "react-router-dom";

function CartProduct(props) {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const { setCart } = useStateContext();
  const { _id, name, price, image, sale, salePrice, category, rating } =
    props.item;
  // const rating = 4;

  useEffect(() => {
    const storedUser = localStorage.getItem("User");
    const userObject = JSON.parse(storedUser);
    if (userObject) {
      setUserId(userObject._id);
    }
  }, [userId]);

  const handleAddCart = async () => {
    const data = {
      idUser: userId,
      idItem: _id,
      qtyItem: 1,
    };
    try {
      if (userId) {
        axiosClient
          .put(`/add-or-update-cart/${_id}`, data)
          .then(({ data }) => {
            console.log(data);
            setCart(data.data);
            window.location.reload();
          })
          .catch((err) => {
            const response = err.response;
            console.log(response);
          });
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      const response = error.response;
      console.log(response);
    }
  };
  return (
    <div className={`col-lg-3 col-md-4 col-sm-6 mix ${category}`}>
      <div className="product__item sale">
        <div
          className="product__item__pic set-bg"
          style={{
            backgroundImage: `url('${
              window.location.href.slice(0, 22) + image
            }')`,
          }}
        >
          {sale ? <div className="label sale">Sale</div> : <></>}
          <ul className="product__hover">
            <li>
              <a href={image} className="image-popup">
                <BsArrowsAngleExpand />
              </a>
            </li>
            <li className="">
              <button
                onClick={() => handleAddCart()}
                className="transition-all duration-400 ease-out delay-100 bg-[#fff] text-[#000] hover:text-[20px] hover:bg-[#ca1515] cursor-pintre w-[45px] h-[45px] rounded-full flex justify-center items-center"
               
              >
                <BsBag />
              </button>
            </li>
          </ul>
        </div>
        <div className="product__item__text">
          <h6>
            <a href={`/product/${_id}`}>{name}</a>
          </h6>
          <div className="rating">
            <StarRating rating={rating} />
          </div>
          {sale ? (
            <div className="product__price">
              {price}
              <span>{salePrice}</span>
            </div>
          ) : (
            <div className="product__price">{price}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartProduct;
