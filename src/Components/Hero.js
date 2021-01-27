import React from "react";

function Hero() {
    return (
        <section id="hero" className="d-flex align-items-center">
            <div
                className="container position-relative text-center text-lg-left"
                data-aos="zoom-in"
                data-aos-delay="100"
            >
                <div className="row">
                    <div className="col-lg-8">
                        <h1>
                            Welcome to <span>Rawbloom</span>
                        </h1>
                        <h2>Delivering Cosmetic products</h2>

                        <div className="btns">
                            <a href="#menu" className="btn-menu animated fadeInUp scrollto">
                                Shop now!
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
