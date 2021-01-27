import React from "react";
import image from "../img/menu/bread-barrel.jpg";

import { BiHeart, BiRightArrow, BiRightArrowAlt, FiPlus } from "react-icons/all";
function Shop() {
    return (
        <section id="shop" className="menu section-bg">
            <div className="container" data-aos="fade-up">
                <div className="section-title">
                    <h2>Products</h2>
                    <div className="shopList">
                        <p>Check Our latest Products</p>
                        <button className="rest">
                            <p>Veiw all Products</p>
                            <span>
                                <BiRightArrowAlt size="1.25rem" />
                            </span>
                        </button>
                    </div>
                </div>

                <div className="row menu-container" data-aos="fade-up" data-aos-delay="200">
                    <div className="item shadow">
                        <img src={image} className="menu-img" alt="" />
                        <div className="menu-content">
                            <p className="product-name">Lobster Bisque</p>
                            <div className="menu-ingredients">
                                Lorem, deren, trataro, filede, nerada
                            </div>
                        </div>
                        <div className="cta">
                            <button className="add-to-cart shadow">
                                <FiPlus size="2em" color="white" />
                            </button>
                            <span className="price">$5.95</span>
                        </div>
                        <div className="fav">
                            <BiHeart size="2rem" />
                        </div>
                    </div>

                    <div className="item shadow">
                        <img src={image} className="menu-img" alt="" />
                        <div className="menu-content">
                            <p className="product-name">Lobster Bisque</p>
                            <div className="menu-ingredients">
                                Lorem, deren, trataro, filede, nerada
                            </div>
                        </div>
                        <div className="cta">
                            <button className="add-to-cart shadow">
                                <FiPlus size="2em" color="white" />
                            </button>
                            <span className="price">$5.95</span>
                        </div>
                        <div className="fav">
                            <BiHeart size="2rem" />
                        </div>
                    </div>
                    <div className="item shadow">
                        <img src={image} className="menu-img" alt="" />
                        <div className="menu-content">
                            <p className="product-name">Lobster Bisque</p>
                            <div className="menu-ingredients">
                                Lorem, deren, trataro, filede, nerada
                            </div>
                        </div>
                        <div className="cta">
                            <button className="add-to-cart shadow">
                                <FiPlus size="2em" color="white" />
                            </button>
                            <span className="price">$5.95</span>
                        </div>
                        <div className="fav">
                            <BiHeart size="2rem" />
                        </div>
                    </div>
                    <div className="item shadow">
                        <img src={image} className="menu-img" alt="" />
                        <div className="menu-content">
                            <p className="product-name">Lobster Bisque</p>
                            <div className="menu-ingredients">
                                Lorem, deren, trataro, filede, nerada
                            </div>
                        </div>
                        <div className="cta">
                            <button className="add-to-cart shadow">
                                <FiPlus size="2em" color="white" />
                            </button>
                            <span className="price">$5.95</span>
                        </div>
                        <div className="fav">
                            <BiHeart size="2rem" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Shop;
