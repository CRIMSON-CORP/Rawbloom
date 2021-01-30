import React, { useState, useEffect } from "react";
import Header from "./Components/Header";
import Hero from "./Components/Hero";
import Testimonial from "./Components/Testimonial";
import Footer from "./Components/Footer";
import About from "./Components/About";
import Shop from "./Components/Shop";
import WhyUs from "./Components/WhyUs";
import Contact from "./Components/Contact";
import Store from "./Components/Store";
import "jquery.easing";
import $ from "jquery";
import { BiUpArrowAlt } from "react-icons/bi";
import { store } from "react-notifications-component";
import { v4 } from "uuid";
import Products from "./Components/Products";
import PlaceOrder from "./Components/PlaceOrder";
function App() {
    const [Loading, setLoading] = useState(true);
    const [cart, AddToCart] = useState([]);
    const [PlaceOrderModal, setPlaceOrderModal] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);
    useEffect(() => {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $("#header").addClass("header-scrolled");
                $(".back-to-top").fadeIn("slow");
            } else {
                $("#header").removeClass("header-scrolled");
                $(".back-to-top").fadeOut("slow");
            }
        });
    }, []);

    setTimeout(() => {
        var nav_sections = $("section");
        var main_nav = $(".nav-menu, .mobile-nav");

        $(window).on("scroll", function () {
            var cur_pos = $(this).scrollTop() + 200;

            nav_sections.each(function () {
                var top = $(this).offset().top,
                    bottom = top + $(this).outerHeight();
                if (cur_pos >= top && cur_pos <= bottom) {
                    if (cur_pos <= bottom) {
                        main_nav.find("li").removeClass("active");
                    }
                    main_nav
                        .find('a[href="#' + $(this).attr("id") + '"]')
                        .parent("li")
                        .addClass("active");
                }
                if (cur_pos < 300) {
                    $(".nav-menu ul:first li:first").addClass("active");
                }
            });
        });
    }, 100);

    function AddItemToCart({ id, count, name, ItemPrice, imgSrc, quantity }) {
        const item = {
            id: v4(),
            count,
            name,
            ItemPrice,
            imgSrc,
            quantity,
        };
        AddToCart((prev) => [...prev, item]);
        return true;
    }

    function EditItemInCart({ id, count = null, quantity = null }, action) {
        switch (action) {
            case "del":
                AddToCart(
                    cart.filter((item) => {
                        return item.id !== id;
                    })
                );
                store.addNotification({
                    title: "Item Removed from Cart!",
                    message: "Your Item has been rewmoved from Your Cart!",
                    type: "danger",
                    container: "top-left",
                    animationIn: ["animated", "jackInTheBox"],
                    animationOut: ["animated", "bounceOut"],
                    dismiss: {
                        duration: 3000,
                        onScreen: true,
                        showIcon: true,
                        touch: true,
                        click: true,
                    },
                });
                break;
            case "dec":
                AddToCart(
                    cart.map((cartItem) => {
                        if (cartItem.id === id) {
                            if (cartItem.count <= 1) return cartItem;
                            else cartItem.count--;
                        }
                        return cartItem;
                    })
                );
                break;
            case "inc":
                AddToCart(
                    cart.map((cartItem) => {
                        if (cartItem.id === id) {
                            if (cartItem.count >= quantity) return cartItem;
                            else cartItem.count++;
                        }
                        return cartItem;
                    })
                );
                break;
            default:
                break;
        }
    }

    var newest = [];
    for (let index = 0; index <= 3; index++) {
        newest[index] = Products[index];
    }
    return Loading ? (
        <div id="preloader"></div>
    ) : (
        <div className="App">
            <Header props={{ cart, EditItemInCart, setPlaceOrderModal }} />
            <div>
                <div>
                    <Hero />
                    <Shop props={AddItemToCart} products={newest} />
                    <About />
                    <WhyUs />
                    <Testimonial />
                    <Contact />
                    <Footer />
                </div>
                {/* <div>
                    <Store props={Products} Addtocart={AddItemToCart} />
                </div> */}
                <PlaceOrder props={{ PlaceOrderModal, setPlaceOrderModal }} />
            </div>
            <a
                href="#"
                className="back-to-top"
                onClick={() => {
                    $("html, body").animate(
                        {
                            scrollTop: 0,
                        },
                        1500,
                        "easeInOutExpo"
                    );
                }}
            >
                <i>
                    <BiUpArrowAlt />
                </i>
            </a>
        </div>
    );
}

export default App;
