import React, { useState, useEffect } from "react";
import { BsExclamationCircle } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";
import { CSSTransition } from "react-transition-group";
import OnOutsideClick from "react-outclick";
import { States } from "../../utils/utils";
function OrderForm({ props: { setData, setProceed, next } }) {
    const [errs, setErrs] = useState({
        name: false,
        email: false,
        number: false,
        address: false,
    });
    const [Drop, setDrop] = useState(false);

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

    function Reducer(name, value) {
        switch (name) {
            case "name":
                setData(name, value);
                if (value.length < 4 && value.length > 0) {
                    setErrs((prev) => {
                        return { ...prev, [name]: true };
                    });
                } else
                    setErrs((prev) => {
                        return { ...prev, [name]: false };
                    });
                break;
            case "email":
                setData(name, value);
                var mailformat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!value.match(mailformat) && value.length > 0) {
                    setErrs((prev) => {
                        return { ...prev, [name]: true };
                    });
                } else
                    setErrs((prev) => {
                        return { ...prev, [name]: false };
                    });
                break;
            case "number":
                setData(name, value);
                if ((value.length !== 0 && value.length < 11) || value.length > 14) {
                    setErrs((prev) => {
                        return { ...prev, [name]: true };
                    });
                } else
                    setErrs((prev) => {
                        return { ...prev, [name]: false };
                    });
                break;
            case "address":
                setData(name, value);
                if (value.length <= 0) {
                    setErrs((prev) => {
                        return { ...prev, [name]: true };
                    });
                } else
                    setErrs((prev) => {
                        return { ...prev, [name]: false };
                    });
            default:
                return null;
        }
    }
    return (
        <div>
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
                                onChange={({ target: { name, value } }) => Reducer(name, value)}
                            />
                            <div className={`validate ${errs.name ? "show" : ""}`}>
                                <BsExclamationCircle strokeWidth={1} /> Please enter at least 4
                                chars
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
                                onChange={({ target: { name, value } }) => Reducer(name, value)}
                            />
                            <div className={`validate ${errs.email ? "show" : ""}`}>
                                <BsExclamationCircle strokeWidth={1} /> Please enter a valid email
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
                                onChange={({ target: { name, value } }) => Reducer(name, value)}
                            />
                            <div className={`validate ${errs.number ? "show" : ""}`}>
                                <BsExclamationCircle strokeWidth={1} /> Please enter a valid Phone
                                number
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
                                            <p className="m-0">Select your Region</p>
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
                                                <ul className="list-group">{list}</ul>
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
                            onChange={({ target: { name, value } }) => Reducer(name, value)}
                        ></textarea>
                        <div className={`validate ${errs.address ? "show" : ""}`}>
                            <BsExclamationCircle strokeWidth={1} /> Please write your Address!
                        </div>
                    </div>
                    <div className="text-center">
                        <div className={`proceed ${proceed ? "" : "disabled"}`} onClick={next}>
                            Proceed to Order
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderForm;