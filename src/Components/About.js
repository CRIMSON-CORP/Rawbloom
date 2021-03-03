import React from "react";
import { MdCancel, MdCheckCircle } from "react-icons/md";
import about from "../img/about.jpg";

function About() {
    return (
        <section id="about" className="about">
            <div className="container" data-aos="fade-up">
                <div className="row">
                    <div
                        className="col-lg-6 order-1 order-lg-2"
                        data-aos="zoom-in"
                        data-aos-delay="100"
                    >
                        <div className="about-img">
                            <img src={about} alt="" />
                        </div>
                    </div>
                    <div className="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content">
                        <h3>
                            Rawbloom skincare is a brand that makes you confident in your skin tone.
                        </h3>
                        <ul>
                            <li>
                                <MdCancel className="about_cancel" /> Our brand doesn’t support
                                bleaching.
                            </li>
                            <li>
                                <MdCheckCircle className="about_check" /> Our products are made with
                                safe and natural ingredients.
                            </li>
                        </ul>
                        <p className="font-italic">"Consistency is the key to a flawless skin."</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;
