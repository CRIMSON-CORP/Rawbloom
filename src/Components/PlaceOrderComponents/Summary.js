import React, { useContext, useState } from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import { CartContext, formDataContext } from "../../utils/Contexts";
import RecieptUpload from "./RecieptUpload";
import { Copy } from "../../utils/utils";
import { v4 } from "uuid";
import { MdCheckCircle, MdChevronLeft } from "react-icons/md";
import firebase from "../../utils/firebase";
function Summary({ props: { prev, confirm, modalRef } }) {
    const { totalPrice, cart, AddToCart } = useContext(CartContext);
    const { formData, setFormData } = useContext(formDataContext);
    const [OrderID, setOrderID] = useState(null);
    const [feedback, setFeedback] = useState(null);

    async function Order(e) {
        e.preventDefault();
        setOrderID(v4());
        const payload = {
            OrderId: OrderID,
            completed: false,
            payload: {
                ClientData: formData,
                ClientCart: cart,
            },
        };
        modalRef.current.scrollTop = 0;

        try {
            const Ref = firebase.firestore().collection("orders");
            await Ref.add(payload);
            setFeedback(true);
            AddToCart([]);
            setFormData({
                name: "",
                email: "",
                number: "",
                address: "",
                region: "",
                receiptUrl: "",
                shipping_fee: "",
                delivery_method: "",
            });
        } catch (err) {
            setFeedback(false);
        }
    }

    return (
        <>
            {feedback === null ? (
                <Details props={{ totalPrice, prev, confirm, Order, formData }} />
            ) : feedback === true ? (
                <SuccessFeedBack props={{ OrderID }} />
            ) : (
                <FailedFeedBack props={{ prev, setFeedback }} />
            )}
        </>
    );
}

export default Summary;

function Details({ props: { totalPrice, prev, confirm, Order, formData } }) {
    return (
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
                            <span>${totalPrice + formData.shipping_fee}</span>
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
                                <span className="tag">Your Phone Number</span>
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
                        <p>Please to pay for your Order, Please upload a Reciept of Transfer to:</p>
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
                                    Copy(
                                        "Account Number has been Copied to your Clip Board, Paste it any where!",
                                        "#acc"
                                    );
                                }}
                            >
                                Copy Account Number
                            </button>
                        </pre>
                        <RecieptUpload />
                    </div>
                </div>
                <div className="cta  mt-3">
                    <div className="back proceed" onClick={prev}>
                        <BiLeftArrowAlt size={"2rem"} />
                    </div>
                    <div className={`proceed ${confirm ? "" : "disabled"}`} onClick={Order}>
                        Confirm
                    </div>
                </div>
            </div>
        </div>
    );
}

function SuccessFeedBack({ props: { OrderID } }) {
    return (
        <div className="text-center m-auto">
            <MdCheckCircle size="5rem" className="mb-4" />
            <h3>Sucess!</h3>
            <p>We have recieved your Order!</p>
            <p>
                Your Order ID = <span id="Orderid">{OrderID}</span>
            </p>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    Copy(
                        "Your Id has been Copied, Please Keep this Id as it will might be needed later",
                        "#Orderid"
                    );
                }}
                className="copy"
            >
                Click to copy ID
            </button>
        </div>
    );
}
function FailedFeedBack({ props: { prev, setFeedback } }) {
    const { setConfirm } = useContext(formDataContext);
    return (
        <div className="text-center m-auto">
            <MdCheckCircle size="5rem" className="mb-4" />
            <h3>Failed!</h3>
            <p>An Error Occured</p>
            <p>Your Order could not be finished, please try again later</p>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    prev();
                    setFeedback(null);
                    setConfirm(false);
                }}
                className="copy"
            >
                <MdChevronLeft /> Go back
            </button>
        </div>
    );
}
