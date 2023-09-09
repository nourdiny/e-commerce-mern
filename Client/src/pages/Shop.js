import React, { useState, useEffect } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider";
import CartProduct from "../components/CartProduct.js";
import Breadcrumb from "../components/Breadcrumb";
import { useLocation } from 'react-router-dom';


function Shop() {
  const {textSearch , setTextSearch} = useStateContext();
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 11;
  const [minValue, setMinValue] = useState(33);
  const [maxValue, setMaxValue] = useState(99);
  const location = useLocation();
  const searchQ = new URLSearchParams(location.search).get('search');
  const searchend = false;
  if(searchQ){
    setTextSearch(searchQ)
    console.log(textSearch);
  }

  useEffect(() => {
    handleProducts();
    setTotalItems(products.length);

  }, [filter,textSearch ]);

  const handleProducts = async () => {
    try {
      axiosClient
        .get("/products")
        .then(({ data }) => {
          if (textSearch !== '' && searchend === false) {
            console.log("sera : ", textSearch);
            const filterProduct = data.filter((product) => {
              return product.name.toLowerCase().includes(textSearch.toLowerCase());
            });
            console.log(filterProduct);
            setProducts(filterProduct);
            searchend = true;
         
          } else if (filter === "all") {
            setProducts(data);
       
          } else if (filter === "Price" || filter === "price") {
            const filterProduct = data.filter((product) => {
              const numericPart = parseFloat(product.price.substring(1));
              return numericPart >= minValue && numericPart <= maxValue;
            });
            setProducts(filterProduct);
   
          } else {
            const filterProduct = data.filter(
              (product) =>
                product.category.toLowerCase() === filter.toLowerCase()
            );
            setProducts(filterProduct);

          }
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
    <>
      <Breadcrumb path={["Shop"]} />
      <section className="shop spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-3">
              <div className="shop__sidebar">
                <div className="sidebar__categories">
                  <div className="section-title">
                    <h4>Categories</h4>
                  </div>
                  <div className="categories__accordion">
                    <div className="accordion" id="accordionExample">
                      <div className="card">
                        <div className="card-heading active">
                          <button className="font-[600]" onClick={() => {setCurrentPage(1); setFilter("all")}}>All</button>
                        </div>
                      </div>
                      <div className="card">
                        <div className="card-heading active">
                          <button className="font-[600]" onClick={() => {setCurrentPage(1); setFilter("women")}}>Women</button>
                        </div>
                      </div>
                      <div className="card">
                        <div className="card-heading">
                          <button className="font-[600]" onClick={() => {setCurrentPage(1); setFilter("men")}}>Men</button>
                        </div>
                      </div>
                      <div className="card">
                        <div className="card-heading">
                          <button className="font-[600]" onClick={() => {setCurrentPage(1); setFilter("kids")}}>Kids</button>
                        </div>
                      </div>
                      <div className="card">
                        <div className="card-heading">
                          <button className="font-[600]" onClick={() => {setCurrentPage(1); setFilter("accessories")}}>
                            Accessories
                          </button>
                        </div>
                      </div>
                      <div className="card">
                        <div className="card-heading">
                          <button className="font-[600]" onClick={() => {setCurrentPage(1); setFilter("cosmetic")}}>Cosmetic</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sidebar__filter">
                  <div className="section-title ">
                    <h4>Shop by price</h4>
                  </div>
                  <div className="filter-range-wrap">
                    <div className="range-slider mb-[10px]">
                      <div className="price flex items-center">
                        <span className="mr-2">Price :</span>
                        <span className="mr-2">$</span>
                        <input
                          type="text"
                          className="min w-[50px] border rounded pl-2 mr-2"
                          value={minValue}
                          onChange={(e) => setMinValue(e.target.value)}
                        />
                        <span className="mr-2">$</span>
                        <input
                          type="text"
                          className="max w-[50px] border rounded pl-2"
                          value={maxValue}
                          onChange={(e) => setMaxValue(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <a
                    onClick={() => {
                      if (filter === "price") {
                        setFilter("Price");
                      } else {
                        setFilter("price");
                      }
                    }}
                    className="absolute b-[0] "
                  >
                    Filter
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-9 col-md-9">
              <div className="row">
                {products
                  .slice(currentPage - 1, currentPage + itemsPerPage)
                  .map((item, index) => {
                    return <CartProduct item={item} key={index} />;
                  })}
                <div className="col-lg-12 text-center">
                  <div className="pagination__option">
                    <a
                      onClick={() => {
                        if (currentPage - 11 > 0) {
                          setCurrentPage(Math.max(currentPage - 11, 1));
                        }
                      }}
                    >
                      <i className="fa fa-angle-left"></i>
                    </a>
                    <a href="#">{Math.trunc(currentPage / 11) + 1}</a>
                    <a
                      onClick={() => {
                        setTotalItems(products.length);
                        console.log(totalItems);
                        console.log("currentPage : ",currentPage);
                        if (currentPage + 11 <= totalItems) {
                          setCurrentPage(currentPage + 11);
                          console.log("currentPage : ",currentPage);
                        }
                        
                      }}
                    >
                      <i className="fa fa-angle-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Shop;
