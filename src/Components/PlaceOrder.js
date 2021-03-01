import React, { useRef, useState, useEffect, useContext } from "react";
import { CgClose } from "react-icons/cg";
import { CSSTransition } from "react-transition-group";
import Swiper from "react-id-swiper";
import "swiper/swiper.min.css";
import firebase from "../utils/firebase";
import { BiLeftArrowAlt } from "react-icons/bi";
import { ImageTypes, Copy } from "../utils/utils";
import { CartContext } from "../utils/Contexts";
import { UploadImage } from "../utils/firebaseUtils";
import OrderForm from "./PlaceOrderComponents/OrderForm";
import { v4 } from "uuid";
import Summary from "./PlaceOrderComponents/Summary";
function PlaceOrder({ props: { PlaceOrderModal } }) {
    const { setPlaceOrderModal, totalPrice, cart } = useContext(CartContext);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        number: "",
        address: "",
        region: "",
        receiptUrl: "",
        shipping_fee: "",
        delivery_method: "",
    });
    const [proceed, setProceed] = useState(false);
    const [confirm, setConfirm] = useState(false);

    const SwiperRef = useRef(null);
    const modalRef = useRef(null);

    useEffect(() => {
        if (proceed && formData.receiptUrl !== "") {
            setConfirm(true);
        }
    }, [proceed]);

    function setData(name, value) {
        setFormData((prev) => {
            return { ...prev, [name]: value };
        });
    }
    function next() {
        if (SwiperRef.current && SwiperRef.current.swiper) {
            SwiperRef.current.swiper.slideNext();
            modalRef.current.scrollTop = 0;
        }
    }
    function prev() {
        if (SwiperRef.current && SwiperRef.current.swiper) {
            SwiperRef.current.swiper.slidePrev();

            modalRef.current.scrollTop = 0;
        }
    }

    async function Order(e) {
        e.preventDefault();
        const payload = {
            OrderId: v4(),
            completed: false,
            payload: {
                ClientData: formData,
                ClientCart: cart,
            },
        };
        console.log(payload);
        try {
            const Ref = firebase.database().ref("orders");
            await Ref.add(payload);
        } catch (err) {
            console.log(err);
        }
    }

    const Params = {
        spaceBetween: 0,
        slidesPerView: 1,
    };

    return (
        <CSSTransition in={PlaceOrderModal} classNames="show1" timeout={250} unmountOnExit>
            <div className="PlaceOrderModal ProductModal">
                <div className="modalBox container scrollBar" ref={modalRef}>
                    <div className="row">
                        <button onClick={() => setPlaceOrderModal(false)} className="closeModal">
                            <CgClose size="1.5rem" />
                        </button>
                        <form className="text-center">
                            <Swiper ref={SwiperRef} {...Params} allowTouchMove={false}>
                                <OrderForm props={{ setData, setProceed, next }} />
                                <Summary props={{ formData }} />
                            </Swiper>
                        </form>
                    </div>
                </div>
            </div>
        </CSSTransition>
    );
}

export default PlaceOrder;
