import React, { useEffect, useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import axiosClient from "../axios-client.js";
import {IoClose} from 'react-icons/io5';


function Profile() {

  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("User");
    const userObject = JSON.parse(storedUser);
    if (userObject) {
      setUser(userObject);
      console.log(user);
      console.log("orders : ", orders);
      setloading(true);
    }
    handlCarts(user._id);
  }, [loading]);

  const handlCarts = async (userId) => {
    try {
      if (loading) {
        axiosClient
          .get(`/orders/${userId}`)
          .then(({ data }) => {
            setOrders(data);
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

  const CancelOrder = (id) =>{
    try {
      if (loading) {
        axiosClient
          .delete(`/delete-order/${id}`)
          .then(({ data }) => {
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
  }

  return (
    <>
      <Breadcrumb path={["Profile"]} />
      <section class="checkout spad">
        <div class="container">
          <div class="checkout__form">
            <div class="row">
              <div class="col-lg-4">
                <div class="checkout__order max-w-[250px] overflow-hidden">
                  <img
                    src="https://www.vhv.rs/file/max/32/329401_profile-icon-png.png"
                    alt="Profile Photo"
                  />
                </div>
              </div>
              <div class="col-lg-8">
                <h5>Profile</h5>
                <div class="row">
                  <div class="col-lg-6 col-md-6 col-sm-6">
                    <div class="checkout__form__input">
                      <p>
                        First Name <span>*</span>
                      </p>
                      <input type="text" value={user.firstName} disabled />
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6 col-sm-6">
                    <div class="checkout__form__input">
                      <p>
                        Last Name <span>*</span>
                      </p>
                      <input type="text" value={user.lastName} disabled />
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="checkout__form__input">
                      <p>
                        Email <span>*</span>
                      </p>
                      <input type="text" value={user.email} disabled />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="shop-cart spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="shop__cart__table">
                <table>
                  <thead>
                    <tr className="text-center bg-[#eee] pt-[10px]">
                      <th >Id Orde</th>
                      <th >Products</th>
                      <th >Total</th>
                      <th >Date</th>
                      <th>status</th>
                      <th>Cancel</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((item, index) => {
                      return (
                        <tr key={index} className="text-center orders text-[16px] font-[600]">
                          <td className="cart__id ">#{item._id.slice(0,10)}</td>
                          <td className="cart__qty">{item.products.length}</td>
                          <td className="cart__total">$ {item.total}</td>
                          <td className="cart__date min-w-[150px] ">{item.date.slice(0,10)}</td>
                          <td className="cart__close text-center">
                            <spann className={`${item.status === "Pending" ? "text-[#38b000]" : "text-[#ffb700]"}`}>
                            {item.status}
                            </spann>
                          </td>
                          <td className="cart__close text-center">
                            <a className="flex cursor-pointer justify-center" 
                            onClick={()=> CancelOrder(item._id)}
                            >
                              <IoClose className="text-[20px] " />
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Profile;
