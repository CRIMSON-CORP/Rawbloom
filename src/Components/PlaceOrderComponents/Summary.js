import React, { useContext } from "react";
import { CartContext } from "../utils/Contexts";
import RecieptUpload from "./RecieptUpload";
function Summary({ props: { formData, prev, confirm } }) {
    const { totalPrice } = useContext(CartContext);
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
                                        "Account Number has been Copied to your Clip Board, Paste it any where!"
                                    );
                                }}
                            >
                                Copy Account Number
                            </button>
                        </pre>
                        <RecieptUpload props={{ setFormData, formData }} />
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

export default Summary;
