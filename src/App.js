import React, { useState, useEffect } from "react";
import Header from "./Components/Header";
import Hero from "./Components/Hero";
import Testimonial from "./Components/Testimonial";
import { $ } from "react-jquery-plugin";
import Footer from "./Components/Footer";
import Contact from "./Components/Contact";
import { BiUpArrowAlt } from "react-icons/bi";
import WhyUs from "./Components/WhyUs";
import "jquery.easing";
import About from "./Components/About";
import Shop from "./Components/Shop";
function App() {
    const [Loading, setLoading] = useState(true);
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

    return Loading ? (
        <div id="preloader"></div>
    ) : (
        <div className="App">
            <Header />
            <Hero />
            <Shop />
            <About />
            <WhyUs />
            <Testimonial />
            <Contact />
            <Footer />
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
