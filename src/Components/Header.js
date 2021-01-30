import React, { useState } from "react";
import { BiCart } from "react-icons/bi";
import { FaTruck } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
import { CgClose } from "react-icons/cg";
import { MdDelete } from "react-icons/md";
import { CSSTransition } from "react-transition-group";
import $ from "jquery";

function Header({ props: { cart, EditItemInCart, setPlaceOrderModal } }) {
    const [dropCart, setDropCart] = useState(false);
    const LinkObj = [
        {
            link: "#header",
            name: "Home",
            active: true,
        },
        {
            link: "#shop",
            name: "Shop",
        },
        {
            link: "#about",
            name: "About",
        },

        {
            link: "#contact",
            name: "Contact",
        },
    ];

    const LinkObjJSX = LinkObj.map(({ link, name, active }, index) => {
        return (
            <li className={`${active ? "active" : ""}`} key={index}>
                <a
                    href={link}
                    onClick={(e) => {
                        e.preventDefault();
                        var scrolltoOffset = $("#header").outerHeight() - 1;
                        var target = $(`${e.target.attributes.href.value}`);
                        var scrollto = target.offset().top - scrolltoOffset;

                        if (e.target.attributes.href.value === "#header") {
                            scrollto = 0;
                        }

                        $("html, body").animate(
                            {
                                scrollTop: scrollto,
                            },
                            1500,
                            "easeInOutExpo"
                        );
                    }}
                >
                    {name}
                </a>
            </li>
        );
    });
    return (
        <header id="header" className="fixed-top">
            <div className="container d-flex align-items-center head">
                <h1 className="logo mr-auto">
                    <a
                        href="#header"
                        onClick={(e) => {
                            e.preventDefault();
                            var scrolltoOffset = $("#header").outerHeight() - 1;
                            var target = $(`${e.target.attributes.href.value}`);
                            var scrollto = target.offset().top - scrolltoOffset;

                            if (e.target.attributes.href.value === "#header") {
                                scrollto = 0;
                            }

                            $("html, body").animate(
                                {
                                    scrollTop: scrollto,
                                },
                                1500,
                                "easeInOutExpo"
                            );
                        }}
                    >
                        Rawbloom
                    </a>
                </h1>
                <nav className="nav-menu d-none d-lg-block">
                    <ul>{LinkObjJSX}</ul>
                </nav>
                <li
                    className="cart"
                    onClick={(e) => {
                        setDropCart(!dropCart);
                    }}
                >
                    <span className={`notif ${cart.length > 0 ? "active" : ""}`}>
                        {cart.length}
                    </span>
                    {dropCart ? <CgClose size="1.5rem" /> : <BiCart size="1.5rem" />}
                </li>
                <CSSTransition in={dropCart} timeout={400} classNames="dropCart" unmountOnExit>
                    <div className="cartDropDown">
                        <Cart cart={cart} edit={EditItemInCart} />
                        {cart.length == 0 ? null : (
                            <div
                                className="order add-to-cart"
                                onClick={() => {
                                    setPlaceOrderModal(true);
                                }}
                            >
                                <FaTruck />
                                <p className="m-0 ml-2">Place Order</p>
                            </div>
                        )}
                    </div>
                </CSSTransition>
            </div>
        </header>
    );
}

function EachItemInCart({
    props: { id, imgSrc, name, count, quantity, ItemPrice },
    edit: EditItemInCart,
}) {
    return (
        <div className="eachItem" key={id}>
            <img src={imgSrc} alt="" />
            <div>
                <h5>{name}</h5>
                <div className="quantity">
                    <p>Quantity</p>
                    <div className="bar">
                        <button
                            className="dec count"
                            onClick={() => {
                                EditItemInCart({ id }, "dec");
                            }}
                        >
                            <FiMinus />
                        </button>
                        {count}
                        <button
                            className="inc count"
                            onClick={() => {
                                EditItemInCart({ id, quantity }, "inc");
                            }}
                        >
                            <FiPlus color="white" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="text-right">
                <MdDelete
                    size="1.2rem"
                    onClick={() => {
                        EditItemInCart({ id }, "del");
                    }}
                />
                <p>${ItemPrice}</p>
            </div>
        </div>
    );
}

function Cart({ cart: cart, edit: EditItemInCart }) {
    const NoItem = (
        <div className="noItem">
            <h4>You have No Items in Your Cart!</h4>
        </div>
    );
    const CartItemsJSX = cart.map((cart, index) => {
        return <EachItemInCart props={cart} edit={EditItemInCart} key={index} />;
    });
    return cart.length == 0 ? NoItem : <div className="itemList">{CartItemsJSX}</div>;
}

export default Header;
