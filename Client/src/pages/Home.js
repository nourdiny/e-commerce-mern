import React , {useState , useEffect} from "react";
import axiosClient from "../axios-client.js";
import {
  Category_1,
  Category_2,
  Category_3,
  Category_4,
  Category_5,
} from "../utils/Data";
import CartProduct from "../components/CartProduct.js";


function Home() {
  const [products , setProducts] = useState([]);
  const [filter , setFilter] = useState('all');
  // console.log(filter);
  useEffect(()=>{
      // console.log("firts : ",products);
      handleProducts();
      // console.log("Last : " , products);

  },[filter])



  const handleProducts = async () => {
    try {
      axiosClient.get('/products')
      .then(({data}) => {
        if (filter === 'all') {
          setProducts(data)
        } else {
          const filterProduct = data.filter((product) =>
          product.category.toLowerCase() === filter.toLowerCase() )
          setProducts(filterProduct)
        }
        // console.log(products);
      })
      .catch((err) => {
        const response = err.response;
        console.log(response);
      });
    } catch (error) {
      // console.error(error);
      const response = error.response;
      console.log(response); 
    }
  };


  return (
    <>
      <section className="categories">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 p-0">
              <div
                className="categories__item categories__large__item set-bg"
                style={{ backgroundImage: `url('${Category_1}')` }}
              >
                <div className="categories__text">
                  <h1>Women’s fashion</h1>
                  <p>
                    Sitamet, consectetur adipiscing elit, sed do eiusmod tempor
                    incidid-unt labore edolore magna aliquapendisse ultrices
                    gravida.
                  </p>
                  <a href="/shop">Shop now</a>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 p-0">
                  <div
                    className="categories__item set-bg"
                    style={{ backgroundImage: `url('${Category_2}')` }}
                  >
                    <div className="categories__text">
                      <h4>Men’s fashion</h4>
                      <p>358 items</p>
                      <a href="/shop">Shop now</a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 p-0">
                  <div
                    className="categories__item set-bg"
                    style={{ backgroundImage: `url('${Category_3}')` }}
                  >
                    <div className="categories__text">
                      <h4>Kid’s fashion</h4>
                      <p>273 items</p>
                      <a href="/shop">Shop now</a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 p-0">
                  <div
                    className="categories__item set-bg"
                    style={{ backgroundImage: `url('${Category_4}')` }}
                  >
                    <div className="categories__text">
                      <h4>Cosmetics</h4>
                      <p>159 items</p>
                      <a href="shop">Shop now</a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 p-0">
                  <div
                    className="categories__item set-bg"
                    style={{ backgroundImage: `url('${Category_5}')` }}
                  >
                    <div className="categories__text">
                      <h4>Accessories</h4>
                      <p>792 items</p>
                      <a href="shop">Shop now</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="product spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-4">
              <div className="section-title">
                <h4>New product</h4>
              </div>
            </div>
            <div className="col-lg-8 col-md-8">
              <ul className="filter__controls">
                <li className="active" onClick={()=> setFilter("all")}>
                  All
                </li>
                <li onClick={()=> setFilter("women")}>Women’s</li>
                <li onClick={()=> setFilter("men")}>Men’s</li>
                <li onClick={()=> setFilter("kids")}>Kid’s</li>
                <li onClick={()=> setFilter("accessories")}>Accessories</li>
                <li onClick={()=> setFilter("cosmetic")}>Cosmetics</li>
              </ul>
            </div>
          </div>
          <div className="row property__gallery">
            {products.slice(0,8).map((item , index)=> {
              return <CartProduct item={item} key={index}/>
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
