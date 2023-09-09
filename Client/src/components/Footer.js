import React , {useState} from 'react';
import {AiOutlineInstagram} from 'react-icons/ai';
import { useStateContext } from "../context/ContextProvider";
import { useNavigate } from 'react-router-dom';
import {BiLogoFacebook , BiLogoTwitter, BiLogoYoutube, BiLogoPinterest, BiLogoInstagramAlt} from 'react-icons/bi';
import {insta_1, insta_2, insta_3, 
    insta_4, insta_5 , insta_6,
    payment_1, payment_2, payment_3, 
    payment_4, payment_5 } from "../utils/Data";

function Footer() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const {setActiveSearch ,activeSearch , setTextSearch} = useStateContext();
    const handlerSubmit = (e) => {
        e.preventDefault();
        setTextSearch(search);
        setActiveSearch(!activeSearch);
        navigate(`/shop?search=${encodeURIComponent(search)}`);
    }
  return (
    <>
      <div className="instagram">
    <div className="container-fluid">
        <div className="row">
            <div className="col-lg-2 col-md-4 col-sm-4 p-0">
                <div className="instagram__item set-bg" style={{ backgroundImage: `url('${insta_1}')` }}>
                    <div className="instagram__text">
                        <AiOutlineInstagram size={25} className="fa fa-instagram" />
                        <a href="https://www.instagram.com/noer_boy/">@ Noer_boy</a>
                    </div>
                </div>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-4 p-0">
                <div className="instagram__item set-bg" style={{ backgroundImage: `url('${insta_2}')` }}>
                    <div className="instagram__text">
                        <AiOutlineInstagram size={25} className="fa fa-instagram" />
                        <a href="https://www.instagram.com/noer_boy/">@ Noer_boy</a>
                    </div>
                </div>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-4 p-0">
                <div className="instagram__item set-bg" style={{ backgroundImage: `url('${insta_3}')` }}>
                    <div className="instagram__text">
                        <AiOutlineInstagram size={25} className="fa fa-instagram" />
                        <a href="https://www.instagram.com/noer_boy/">@ Noer_boy</a>
                    </div>
                </div>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-4 p-0">
                <div className="instagram__item set-bg" style={{ backgroundImage: `url('${insta_4}')` }}>
                    <div className="instagram__text">
                        <AiOutlineInstagram size={25} className="fa fa-instagram" />
                        <a href="https://www.instagram.com/noer_boy/">@ Noer_boy</a>
                    </div>
                </div>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-4 p-0">
                <div className="instagram__item set-bg" style={{ backgroundImage: `url('${insta_5}')` }}>
                    <div className="instagram__text">
                        <AiOutlineInstagram size={25} className="fa fa-instagram" />
                        <a href="https://www.instagram.com/noer_boy/">@ Noer_boy</a>
                    </div>
                </div>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-4 p-0">
                <div className="instagram__item set-bg" style={{ backgroundImage: `url('${insta_6}')` }}>
                    <div className="instagram__text">
                        <AiOutlineInstagram size={25} className="fa fa-instagram" />
                        <a href="https://www.instagram.com/noer_boy/">@ Noer_boy</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<footer className="footer">
    <div className="container">
        <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-7">
                <div className="footer__about">
                    <div className="footer__logo">
                        <a href="./index.html"><img src="img/logo.png" alt=""/></a>
                    </div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                    cilisis.</p>
                    <div className="footer__payment">
                        <a href="/"><img src={payment_1} alt=""/></a>
                        <a href="/"><img src={payment_2} alt=""/></a>
                        <a href="/"><img src={payment_3} alt=""/></a>
                        <a href="/"><img src={payment_4} alt=""/></a>
                        <a href="/"><img src={payment_5} alt=""/></a>
                    </div>
                </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-5">
                <div className="footer__widget">
                    <h6>Quick links</h6>
                    <ul>
                        <li><a href="/shop">Shop</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-4">
                <div className="footer__widget">
                    <h6>Account</h6>
                    <ul>
                        <li><a href="/profile">My Account</a></li>
                        <li><a href="/profile">Orders Tracking</a></li>
                        <li><a href="/cart">Wishlist</a></li>
                    </ul>
                </div>
            </div>
            <div className="col-lg-4 col-md-8 col-sm-8">
                <div className="footer__newslatter">
                    <h6>NEWSLETTER</h6>
                    <form action="#">
                        <input type="text" placeholder="Email"/>
                        <button type="submit" className="site-btn">Subscribe</button>
                    </form>
                    <div className="footer__social">
                        <a href="/"><BiLogoFacebook size={25} className="fa fa-facebook pb-[5px]" /></a>
                        <a href="/"><BiLogoTwitter size={25} className="fa fa-twitter pb-[5px]" /></a>
                        <a href="/"><BiLogoYoutube size={25} className="fa fa-youtube-play pb-[5px]" /></a>
                        <a href="/"><BiLogoInstagramAlt size={25} className="fa fa-instagram pb-[5px]" /></a>
                        <a href="/"><BiLogoPinterest size={25} className="fa fa-pinterest pb-[5px]" /></a>
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-12">
                <div className="footer__copyright__text">
                    <p>Copyright &copy; 2023 All rights reserved </p>
                </div>
            </div>
        </div>
    </div>
</footer>

<div className={`${activeSearch ? "block" : ""} search-model `}>
    <div className="h-100 d-flex align-items-center justify-content-center">
        <div className="search-close-switch" onClick={()=> setActiveSearch(!activeSearch)} >+</div>
        <form className="search-model-form" onSubmit={handlerSubmit}>
            <input type="text" id="search-input" placeholder="Search here....." value={search} 
                onChange={(e)=> {e.preventDefault();
                    setSearch(e.target.value)}}/>
        </form>
    </div>
</div>
    </>
  )
}

export default Footer
