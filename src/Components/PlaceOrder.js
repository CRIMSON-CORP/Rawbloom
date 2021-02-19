import React, { useRef, useState, useEffect } from "react";
import { CgClose } from "react-icons/cg";
import { BsExclamationCircle } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";
import { CSSTransition } from "react-transition-group";
import Swiper from "react-id-swiper";
import OnOutsideClick from "react-outclick";
import "swiper/swiper.min.css";
import firebase from "../utils/firebase";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Notification, States } from "../utils/utils";
function PlaceOrder({ props: { PlaceOrderModal, setPlaceOrderModal, totalPrice, cart } }) {
    const [errs, setErrs] = useState({
        name: false,
        email: false,
        number: false,
        address: false,
    });
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
    const [Drop, setDrop] = useState(false);
    const [proceed, setProceed] = useState(false);
    const [confirm, setConfirm] = useState(false);

    const SwiperRef = useRef(null);
    const modalRef = useRef(null);

    useEffect(() => {
        setProceed(false);
        if (
            formData.name !== "" &&
            formData.email !== "" &&
            formData.number !== "" &&
            formData.address !== "" &&
            formData.state !== ""
        ) {
            if (!errs.name && !errs.number && !errs.email && !errs.address) {
                setProceed(true);
            }
        }
    }, [
        errs.name,
        errs.name,
        errs.email,
        errs.number,
        formData.name,
        formData.email,
        formData.number,
        formData.address,
    ]);

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
    var list = States.map((state, index) => {
        return (
            <li
                key={index}
                className="list-group-item"
                onClick={() => {
                    setFormData((prev) => {
                        return {
                            ...prev,
                            region: state.city,
                            delivery_method: state.delivery_method,
                            shipping_fee: state.shipping_fee,
                        };
                    });
                    setDrop(false);
                }}
            >
                {`${state.city}(${state.delivery_method})`}
            </li>
        );
    });

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
                                <div className="slide1">
                                    <div className="form-header mb-4">
                                        <h4>Please fill this form to Complete your Order</h4>
                                        <p>(All fields are required!)</p>
                                    </div>
                                    <div className="form">
                                        <div className="form-row">
                                            <div className="col-md-6 form-group">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    className="form-control"
                                                    id="name"
                                                    placeholder="Your Full name"
                                                    data-rule="minlen:4"
                                                    autoComplete={"off"}
                                                    onChange={({ target: { name, value } }) => {
                                                        setData(name, value);
                                                        if (value.length < 4 && value.length > 0) {
                                                            setErrs((prev) => {
                                                                return { ...prev, [name]: true };
                                                            });
                                                        } else
                                                            setErrs((prev) => {
                                                                return { ...prev, [name]: false };
                                                            });
                                                    }}
                                                />
                                                <div
                                                    className={`validate ${
                                                        errs.name ? "show" : ""
                                                    }`}
                                                >
                                                    <BsExclamationCircle strokeWidth={1} /> Please
                                                    enter at least 4 chars
                                                </div>
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    name="email"
                                                    id="email"
                                                    placeholder="Your Email"
                                                    data-rule="email"
                                                    autoComplete={"off"}
                                                    onChange={({ target: { name, value } }) => {
                                                        setData(name, value);
                                                        var mailformat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                                        if (
                                                            !value.match(mailformat) &&
                                                            value.length > 0
                                                        ) {
                                                            setErrs((prev) => {
                                                                return { ...prev, [name]: true };
                                                            });
                                                        } else
                                                            setErrs((prev) => {
                                                                return { ...prev, [name]: false };
                                                            });
                                                    }}
                                                />
                                                <div
                                                    className={`validate ${
                                                        errs.email ? "show" : ""
                                                    }`}
                                                >
                                                    <BsExclamationCircle strokeWidth={1} /> Please
                                                    enter a valid email
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="col-md-6 form-group">
                                                <input
                                                    type="number"
                                                    name="number"
                                                    className="form-control"
                                                    id="number"
                                                    placeholder="Your Phone Number"
                                                    data-rule="minlen:11"
                                                    autoComplete={"off"}
                                                    onChange={({ target: { name, value } }) => {
                                                        setData(name, value);
                                                        if (
                                                            (value.length !== 0 &&
                                                                value.length < 11) ||
                                                            value.length > 14
                                                        ) {
                                                            setErrs((prev) => {
                                                                return { ...prev, [name]: true };
                                                            });
                                                        } else
                                                            setErrs((prev) => {
                                                                return { ...prev, [name]: false };
                                                            });
                                                    }}
                                                />
                                                <div
                                                    className={`validate ${
                                                        errs.number ? "show" : ""
                                                    }`}
                                                >
                                                    <BsExclamationCircle strokeWidth={1} /> Please
                                                    enter a valid Phone number
                                                </div>
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <OnOutsideClick
                                                    onOutsideClick={() => {
                                                        setDrop(false);
                                                    }}
                                                >
                                                    <div
                                                        className={`states ${
                                                            Drop ? "drop" : ""
                                                        } form-control scrollBar d-flex justify-content-between align-items-center`}
                                                    >
                                                        <div
                                                            className="d-flex justify-content-between align-items-center state-box"
                                                            onClick={() => {
                                                                setDrop(!Drop);
                                                            }}
                                                        >
                                                            {formData.region == "" ? (
                                                                <p className="m-0">
                                                                    Select your Region
                                                                </p>
                                                            ) : (
                                                                formData.region
                                                            )}
                                                            <span>
                                                                <MdKeyboardArrowDown size="1.4rem" />
                                                            </span>
                                                        </div>
                                                        <CSSTransition
                                                            in={Drop}
                                                            timeout={400}
                                                            classNames="drop"
                                                            unmountOnExit
                                                        >
                                                            <div className="card drop-down shadow scrollBar">
                                                                <div className="card-body">
                                                                    <ul className="list-group">
                                                                        {list}
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </CSSTransition>
                                                    </div>
                                                </OnOutsideClick>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <textarea
                                                className="form-control"
                                                name="address"
                                                rows="4"
                                                data-rule="required"
                                                placeholder="Your Address"
                                                onChange={({ target: { name, value } }) => {
                                                    setData(name, value);
                                                    if (value.length <= 0) {
                                                        setErrs((prev) => {
                                                            return { ...prev, [name]: true };
                                                        });
                                                    } else
                                                        setErrs((prev) => {
                                                            return { ...prev, [name]: false };
                                                        });
                                                }}
                                            ></textarea>
                                            <div
                                                className={`validate ${errs.address ? "show" : ""}`}
                                            >
                                                <BsExclamationCircle strokeWidth={1} /> Please write
                                                your Address!
                                            </div>
                                        </div>

                                        <div className="text-center">
                                            <div
                                                className={`proceed ${proceed ? "" : "disabled"}`}
                                                onClick={next}
                                            >
                                                Proceed to Order
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(null);
    const [uploadUpdate, setUploadUpdate] = useState(null);
    function handleChange({ target: { files } }) {
        if (files[0]) {
            setImage(files[0]);
        }
    }

    async function upload(e) {
        e.preventDefault();
        if (!image) return;
        setUploadUpdate("Attempting Upload...");
        if (
            image.type !== "image/png" &&
            image.type !== "image/jpg" &&
            image.type !== "image/jpeg"
        ) {
            return alert("Please upload an Image");
        }
        const StorageRef = firebase.storage().ref();
        const uploadTask = StorageRef.child(`Reciepts/${formData.name}`).put(image);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                setUploading(true);
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                progress = Math.ceil(progress);
                setUploadUpdate(`Uploading... ${progress}% Done...`);
                setUploadProgress(progress);
            },
            (error) => {
                null;
            },
            () => {
                setUploadUpdate(`Uploading Complete.`);
                setUploading(false);
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    setFormData((prev) => {
                        return { ...prev, receiptUrl: download };
                    });
                });
            }
        );
    }
    return (
        <div className="imageupload">
            <div className="upload">
                <input type="file" className="image" onChange={handleChange} />
                <button className="uploadBtn" onClick={upload}>
                    Upload
                </button>
            </div>
            <CSSTransition in={uploading} timeout={1000} classNames={"uploading"} unmountOnExit>
                <>
                    <span className="update mt-2">{uploadUpdate}</span>
                    <div className="Upload_progress mt-1">
                        <span style={{ width: `${uploadProgress}%` }}></span>
                    </div>
                </>
            </CSSTransition>
        </div>
    );
}
