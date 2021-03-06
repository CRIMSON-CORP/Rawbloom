import React, { useState } from "react";
import { FaTwitter, FaFacebookF, FaInstagram, FaSkype, FaLinkedin } from "react-icons/fa";

function Footer() {
    const [email, setEmail] = useState("");
    function setData({ target: { value } }) {
        return setEmail(value);
    }

    function sendData(e) {
        e.preventDefault();
        //
        // Store email in Database
        //
    }
    return (
        <footer id="footer">
            <div className="footer-top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6">
                            <div className="footer-info">
                                <h3>Rawbloom</h3>
                                <p>
                                    A108 Adam Street <br />
                                    NY 535022, USA
                                    <br />
                                    <br />
                                    <strong>Phone:</strong> +1 5589 55488 55
                                    <br />
                                    <strong>Email:</strong> info@example.com
                                    <br />
                                </p>
                                <div className="social-links mt-3">
                                    <a href="#" className="twitter">
                                        <FaTwitter />
                                    </a>
                                    <a href="#" className="facebook">
                                        <FaFacebookF />
                                    </a>
                                    <a href="#" className="instagram">
                                        <FaInstagram />
                                    </a>
                                    <a href="#" className="google-plus skype">
                                        <FaSkype />
                                    </a>
                                    <a href="#" className="linkedin">
                                        <FaLinkedin />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
