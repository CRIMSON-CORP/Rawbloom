import React, { useRef, useState, useEffect, useContext } from "react";
import { CgClose } from "react-icons/cg";
import { CSSTransition } from "react-transition-group";
import Swiper from "react-id-swiper";
import "swiper/swiper.min.css";
import firebase from "../utils/firebase";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Notification, ImageTypes } from "../utils/utils";
import { CartContext } from "../utils/Contexts";
import { UploadImage } from "../utils/firebaseUtils";
import OrderForm from "./PlaceOrderComponents/OrderForm";
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

    function Order(e) {
        e.preventDefault();
        const payload = {
            ...formData,
            cart,
        };
        console.log(payload);
        const Ref = firebase.database().ref("orders");
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
                                <div className="slide2">
                                    <div className="checkout">
                                        <div className="form-header mb-4">
                                            <h4>Payment</h4>
                                        </div>
                                        <div className="content">
                                            <div className="summary shadow p-2">
                                                <span className="tag">Your Order</span>
                                                <hr />
                                                <div className="d-flex justify-content-between data">
                                                    <span>Subtotal</span>
                                                    <span>${totalPrice}</span>
                                                </div>
                                                <div className="d-flex justify-content-between data">
                                                    <span>Shipping fee</span>
                                                    <span>${formData.shipping_fee}</span>
                                                </div>
                                                <hr />
                                                <div className="d-flex justify-content-between data">
                                                    <span>Total</span>
                                                    <span>
                                                        ${totalPrice + formData.shipping_fee}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="Order_address shadow p-2">
                                                <div className="data">
                                                    <span className="tag">Your Address</span>
                                                    <p>{formData.address}</p>
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-md-6 data">
                                                        <span className="tag">
                                                            Your Phone Number
                                                        </span>
                                                        <p>{formData.number}</p>
                                                    </div>
                                                    <hr />
                                                    <div className="col-md-6 data">
                                                        <span className="tag">Your Email</span>
                                                        <p>{formData.email}</p>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-6 data">
                                                        <span className="tag">Your Region</span>
                                                        <p>{formData.region}</p>
                                                    </div>
                                                    <hr />
                                                    <div className="col-md-6 data">
                                                        <span className="tag">Delivery Method</span>
                                                        <p>{formData.delivery_method}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="reciept-upload p-2">
                                                <p>
                                                    Please to pay for your Order, Please upload a
                                                    Reciept of Transfer to:
                                                </p>
                                                <pre>
                                                    Account Name: BlaBla <br />
                                                    Account Number : <span id="acc">123456789</span>
                                                    <br />
                                                    Bank Name: Last bank
                                                    <br />
                                                    <button
                                                        className="copy"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            var temp = document.createElement(
                                                                "input"
                                                            );
                                                            var body = document.querySelector(
                                                                "body"
                                                            );
                                                            body.appendChild(temp);
                                                            temp.value = document.querySelector(
                                                                "#acc"
                                                            ).innerHTML;
                                                            temp.select();
                                                            document.execCommand("copy");
                                                            body.removeChild(temp);
                                                            Notification(
                                                                "success",
                                                                "Copied",
                                                                "Account Number has been Copied to your Clip Board, Paste it any where!"
                                                            );
                                                        }}
                                                    >
                                                        Copy Account Number
                                                    </button>
                                                </pre>
                                                <FileUpload props={{ setFormData, formData }} />
                                            </div>
                                        </div>
                                        <div className="cta  mt-3">
                                            <div className="back proceed" onClick={prev}>
                                                <BiLeftArrowAlt size={"2rem"} />
                                            </div>
                                            <div
                                                className={`proceed ${confirm ? "" : "disabled"}`}
                                                onClick={Order}
                                            >
                                                Confirm
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Swiper>
                        </form>
                    </div>
                </div>
            </div>
        </CSSTransition>
    );
}

export default PlaceOrder;

function FileUpload({ props: { setFormData, formData } }) {
    const [image, setImage] = useState(null);
    const [uploadUpdate, setUploadUpdate] = useState(null);

    async function upload(e) {
        e.preventDefault();
        if (!image) return;
        else if (!ImageTypes.includes(image.type)) {
            return alert("Please upload an Image");
        }
        setUploadUpdate("Attempting Upload...");
        const imageURL = await UploadImage(image, `Reciepts/${formData.name}`);
        setFormData((prev) => {
            return { ...prev, receiptUrl: imageURL };
        });
        setUploadUpdate("Uploading Complete.");
    }
    return (
        <div className="imageupload">
            <div className="upload">
                <input
                    type="file"
                    className="image"
                    onChange={({ target: { files } }) => setImage(files[0])}
                />
                <button className="uploadBtn" onClick={upload}>
                    Upload
                </button>
            </div>
            <span className="update mt-2">{uploadUpdate}</span>
        </div>
    );
}
