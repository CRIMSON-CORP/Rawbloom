import React, { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import { CSSTransition } from "react-transition-group";
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";

function PlaceOrder({ props: { PlaceOrderModal, setPlaceOrderModal } }) {
    const [modal, setModal] = useState(false);
    return (
        <CSSTransition in={PlaceOrderModal} classNames="show" timeout={400} unmountOnExit>
            <div className="ProductModal">
                <div className="modalBox container">
                    <div className="row">
                        <button onClick={() => setPlaceOrderModal(false)} className="closeModal">
                            <CgClose size="1.5rem" />
                        </button>
                        <Swiper>
                            <SwiperSlide></SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </div>
        </CSSTransition>
    );
}

export default PlaceOrder;
