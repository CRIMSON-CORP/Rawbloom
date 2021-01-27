import React from "react";
import { BiCart } from "react-icons/all";
import "jquery.easing";

function Header() {
    const LinkObj = [
        {
            link: "/",
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
            <div className="container d-flex align-items-center">
                <h1 className="logo mr-auto">
                    <a href="index.html">Rawbloom</a>
                </h1>
                <nav className="nav-menu d-none d-lg-block">
                    <ul>
                        {LinkObjJSX}
                        <li className="cart">
                            <BiCart size="1.5em" />
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
