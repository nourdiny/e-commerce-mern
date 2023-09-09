import React, { useEffect, useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import axiosClient from "../axios-client.js";
import { useNavigate } from 'react-router-dom';


function Checkout() {
    const navigate = useNavigate();
    const [total , setTotal] = useState(0);
    const [productArr , setProductArr] = useState();
    const [addresse , setAddresse] = useState('');
    const [zip , setZip] = useState('');
    const [country , setCountry] = useState('');
    const [ user, setUser  ] = useState({});
    const [ loading, setloading  ] = useState(false);


    useEffect(() => {
      const storedUser = localStorage.getItem("User");  
      const userObject = JSON.parse(storedUser);
      if (userObject) {
        setUser(userObject);
        setloading(true)
      } 
      handlTotal(user._id);
      }, [loading]);

  const handlTotal = async () => {
    try {
      if(loading) {
        axiosClient
        .get(`/total-carts/${user._id}`)
        .then(({ data }) => {
          setTotal(data.sum);
          setProductArr(data.productArr)
        })
        .catch((err) => {
          const response = err.response;
          console.log(err);
        });
      }
    } catch (error) {
      console.error(error);
      const response = error.response;
      console.log(response);
    }
  };

  const handlerOrder = () => {
    const data = {
          userId: user._id,
          products: productArr,
          country: country,
          zip: zip,
          address: addresse,
          total: total,
          status: 'Pending',
    };
    try {
      if (user) {
        axiosClient
        .post("/orders", data)
        .then(({ data }) => {
          navigate('/profile');
        })
        .catch((err) => {
          const response = err.response;
          console.log(err);
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
      <Breadcrumb path={["Checkout"]} />
      <section class="checkout spad">
        <div class="container">
          <form action="" class="checkout__form">
            <div class="row">
              <div class="col-lg-8">
                <h5>Billing detail</h5>
                <div class="row">
                  <div class="col-lg-6 col-md-6 col-sm-6">
                    <div class="checkout__form__input">
                      <p>
                        First Name <span>*</span>
                      </p>
                      <input type="text"  
                      disabled
                      value={user.firstName}
                      />
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6 col-sm-6">
                    <div class="checkout__form__input">
                      <p>
                        Last Name <span>*</span>
                      </p>
                      <input type="text" 
                      value={user.lastName} disabled
                      />
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="checkout__form__input">
                      <p>
                        Country <span>*</span>
                      </p>
                      <input type="text" value={country} required onChange={(e)=> setCountry(e.target.value)}/>
                    </div>
                    <div class="checkout__form__input">
                      <p>
                        Address <span>*</span>
                      </p>
                      <input type="text" placeholder="Street Address" required value={addresse} onChange={(e)=> setAddresse(e.target.value)} />
                    </div>
                    <div class="checkout__form__input">
                      <p>
                        Postcode/Zip <span>*</span>
                      </p>
                      <input type="text" value={zip} required onChange={(e)=> setZip(e.target.value)}/>
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6 col-sm-6">
                    <div class="checkout__form__input">
                      <p>
                        Phone <span>*</span>
                      </p>
                      <input type="text" 
                      disabled
                      value={user.phone}
                      />
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6 col-sm-6">
                    <div class="checkout__form__input">
                      <p>
                        Email <span>*</span>
                      </p>
                      <input type="text" 
                      disabled
                      value={user.email}
                      />
                    </div>
                  </div>

                </div>
              </div>
              <div class="col-lg-4">
                <div class="checkout__order">
                  <h5>Your order</h5>
                  <div class="checkout__order__total">
                    <ul>
                      <li>
                        Subtotal <span>$ {total}</span>
                      </li>
                      <li>
                        Total <span>$ {total}</span>
                      </li>
                    </ul>
                  </div>
                  <button type="button" onClick={()=> handlerOrder()} class="site-btn bg-[#ca1515]">
                    Place oder
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Checkout;
