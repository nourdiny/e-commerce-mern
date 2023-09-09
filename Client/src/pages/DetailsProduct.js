import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdOutlineShoppingBag } from "react-icons/md";
import { BsPlusLg } from "react-icons/bs";
import { BiMinus } from "react-icons/bi";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client.js";
import Breadcrumb from "../components/Breadcrumb";
import CartProduct from "../components/CartProduct";
import StarRating from "../components/StarRating";

function DetailsProduct() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const { cart, setCart } = useStateContext();
  const [userId, setUserId] = useState("");
  const [product, setProduct] = useState([]);
  const [products, setProducts] = useState([]);
  const [ loading, setloading  ] = useState(false);


  useEffect(() => {
    const storedUser = localStorage.getItem("User");
    const userObject = JSON.parse(storedUser);
    if (userObject) {
      setUserId(userObject._id);
      setloading(true)
      console.log("Product : ", product);
    }

    handleProduct();
  }, [loading]);

  const handleProduct = async () => {
    try {
      axiosClient
        .get("/products")
        .then(({ data }) => {
          console.log("data : ", data);
          const filterProduct = data.filter((product) => product._id === id);
          console.log("filterProduct : ", filterProduct);
          setProduct(filterProduct);
          setProducts(data);
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

  const handleAddCart = async () => {
    const data = {
      idUser: userId,
      idItem: id,
      qtyItem: qty,
    };
    try {
      if (loading) {
        axiosClient
          .put(`/add-or-update-cart/${id}`, data)
          .then(({ data }) => {
            console.log(data);
            setCart(data.data);
            window.location.reload();
          })
          .catch((err) => {
            const response = err.response;
            console.log(err);
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
    <>
      <Breadcrumb path={[product.name]} />
      <section className="product-details spad">
        <div className="container">
          {product.map((item, index) => {
            const image = window.location.href.slice(0, 22) + item.image;
            return (
              <div className="row" key={index}>
                <div className="col-lg-6">
                  <div className="product__details__pic">
                    <div className="product__details__slider__content">
                      <img
                        data-hash="product-1"
                        className="product__big__img"
                        src={image}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="product__details__text">
                    <h3>{item.name}</h3>
                    <div className="rating">
                      <StarRating rating={item.rating} />
                    </div>
                    {item.sale ? (
                      <div className="product__details__price">
                        {item.price}
                        <span>{item.salePrice}</span>
                      </div>
                    ) : (
                      <div className="product__details__price">{item.price}</div>
                    )}
                    <p>
                      Nemo enim ipsam voluptatem quia aspernatur aut odit aut
                      loret fugit, sed quia consequuntur magni lores eos qui
                      ratione voluptatem sequi nesciunt.
                    </p>
                    <div className="product__details__button">
                      <div className="quantity">
                        <span>Quantity:</span>
                        <div className="pro-qty flex items-center">
                          <BiMinus
                            className="cursor-pointer"
                            onClick={() => {
                              if (qty > 1) {
                                setQty(qty - 1);
                              }
                            }}
                          />
                          <input type="text" value={qty} />
                          <BsPlusLg
                            className="cursor-pointer"
                            onClick={() => {
                              if (qty < 10) {
                                setQty(qty + 1);
                              }
                            }}
                          />
                        </div>
                      </div>
                      <a onClick={()=> handleAddCart()} className="cart-btn flex">
                        <span className="mr-[23px] relative">
                          <MdOutlineShoppingBag className="text-[17px] font-[600] absolute rigth-[15px] top-[1px]" />
                        </span>
                        Add to cart
                      </a>
                    </div>
                    <div className="product__details__widget">
                      <ul>
                        <li>
                          <span>Availability:</span>
                          <div className="stock__checkbox">
                            <label for="stockin">In Stock</label>
                          </div>
                        </li>
                        <li>
                          <span>Promotions:</span>
                          <p>Free shipping</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="product__details__tab">
                    <ul className="nav nav-tabs" role="tablist">
                      <li className="nav-item">
                        <a
                          className="nav-link active cursor-default "
                          data-toggle="tab"
                          href="#tabs-1"
                          role="tab"
                        >
                          Description
                        </a>
                      </li>
                    </ul>
                    <div className="tab-content">
                      <div
                        className="tab-pane active"
                        id="tabs-1"
                        role="tabpanel"
                      >
                        {item.description}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="related__title">
                <h5>RELATED PRODUCTS</h5>
              </div>
            </div>
            {products.slice(1,5).map((item , index) => {
              return<CartProduct item={item} key={index} />;
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default DetailsProduct;
