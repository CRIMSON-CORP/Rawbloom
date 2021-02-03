import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { FiPlus, FiMinus } from "react-icons/fi";
import { BiRightArrowAlt } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { Notification } from "../utils/utils";
import { Link } from "react-router-dom";
function Shop({ props: AddItemToCart, products: newest }) {
    return (
        <section id="shop" className="menu section-bg">
            <div className="container" data-aos="fade-up">
                <div className="section-title">
                    <h2>Products</h2>
                    <div className="shopList">
                        <p>Check Our latest Products</p>
                        <Link className="rest" to="/store">
                            <p>Veiw all Products</p>
                            <span>
                                <BiRightArrowAlt size="1.25rem" />
                            </span>
                        </Link>
                    </div>
                </div>

                <div className="row menu-container" data-aos="fade-up" data-aos-delay="200">
                    <ProductsList products={newest} AddToCart={AddItemToCart} />
                </div>
            </div>
        </section>
    );
}

function EachProductModal({
    props: { quantity, id, description, name, imgSrc, category, price, setModal, AddItemToCart },
}) {
    const [count, setCount] = useState(1);
    const [ItemPrice, setItemPrice] = useState(price);
    useEffect(() => {
        setItemPrice(count * price);
    }, [count]);
    return (
        <div
            className="ProductModal"
            onClick={(e) => {
                if (e.target.classList.contains("ProductModal")) {
                    setModal(false);
                }
            }}
        >
            <div className="modalBox container scrollBar">
                <div className="row">
                    <button onClick={() => setModal(false)} className="closeModal">
                        <CgClose size="1.5rem" />
                    </button>
                    <div className="imageDisplay col-lg-6 p-0">
                        <img src={imgSrc} alt="" />
                    </div>
                    <div className="content p-4 col-lg-6">
                        <div className="content-body">
                            <h1 className="name">{name}</h1>
                            <p className="description">{description}</p>
                            <p className="category">{category}</p>
                            <div className="quantity">
                                <p>Quantity</p>
                                <div className="bar">
                                    <button
                                        className="dec count"
                                        onClick={() => {
                                            if (count == 1) return;
                                            setCount(count - 1);
                                        }}
                                    >
                                        <FiMinus />
                                    </button>
                                    <div className="countText">{count}</div>
                                    <button
                                        className="inc count"
                                        onClick={() => {
                                            if (count > quantity) return;
                                            setCount(count + 1);
                                        }}
                                    >
                                        <FiPlus color="white" />
                                    </button>
                                </div>
                            </div>
                            <div className="price">${ItemPrice}</div>
                        </div>
                        <button
                            className="add-to-cart"
                            onClick={() => {
                                const item = {
                                    id,
                                    name,
                                    count,
                                    ItemPrice,
                                    imgSrc,
                                    quantity,
                                    price,
                                };
                                AddItemToCart(item);
                                setModal(false);
                                Notification(
                                    "success",
                                    "Item Added!",
                                    "Your Item has been successfuly added to Your Cart!"
                                );
                            }}
                        >
                            <FiPlus size="1.5em" color="white" />
                            <p className="m-0 ml-2">Add Item to Cart</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
function EachProduct({
    props: { quantity, id, description, name, imgSrc, category, price, AddItemToCart },
}) {
    const [modal, setModal] = useState(false);
    return (
        <div className={`item shadow ${category}`}>
            <img src={imgSrc} className="menu-img" alt="" />
            <div className="menu-content">
                <p className="product-name">{name}</p>
                <div className="menu-ingredients">
                    {description == null || description === "" ? "No Description" : description}
                </div>
            </div>
            <div className="cta">
                <button className="add-to-cart shadow" onClick={() => setModal(true)}>
                    <FiPlus size="2em" color="white" />
                </button>
                {quantity == null || quantity == 0 ? (
                    <span className={"out-of-stock"}>Out of Stock</span>
                ) : (
                    <span className="price">${price}</span>
                )}
            </div>
            <CSSTransition in={modal} classNames="show" timeout={400} unmountOnExit>
                <EachProductModal
                    props={{
                        quantity,
                        id,
                        description,
                        name,
                        imgSrc,
                        category,
                        price,
                        setModal,
                        AddItemToCart,
                    }}
                />
            </CSSTransition>
        </div>
    );
}

function ProductsList({ products: newest, AddToCart: AddItemToCart }) {
    const ProductsJSX = newest.map(
        ({ quantity, id, description, name, imgSrc, category, price }) => {
            return (
                <EachProduct
                    key={id}
                    props={{
                        quantity,
                        id,
                        description,
                        name,
                        imgSrc,
                        category,
                        price,
                        AddItemToCart,
                    }}
                />
            );
        }
    );

    return ProductsJSX;
}

export default Shop;
