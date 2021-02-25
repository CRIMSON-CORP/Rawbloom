import React, { useState, useEffect } from "react";
import { Notification } from "../utils/utils";
import { CgClose } from "react-icons/cg";
import { FiMinus, FiPlus } from "react-icons/fi";
function EachProductModal({
    props: { quantity, id, description, name, imgSrc, category, price, setModal, AddItemToCart },
}) {
    const [count, setCount] = useState(1);
    const [ItemPrice, setItemPrice] = useState(price);
    useEffect(() => {
        setItemPrice(count * price);
    }, [count]);
    return (
        <div
            className="ProductModal"
            onClick={(e) => {
                if (e.target.classList.contains("ProductModal")) {
                    setModal(false);
                }
            }}
        >
            <div className="modalBox container scrollBar">
                <div className="row">
                    <button onClick={() => setModal(false)} className="closeModal">
                        <CgClose size="1.5rem" />
                    </button>
                    <div className="imageDisplay col-lg-6 p-0">
                        <img src={imgSrc} alt="" />
                    </div>
                    <div className="content p-4 col-lg-6">
                        <div className="content-body">
                            <h1 className="name">{name}</h1>
                            <p className="description">{description}</p>
                            <p className="category">{category}</p>
                            <div className="quantity">
                                <p>Quantity</p>
                                <div className="bar">
                                    <button
                                        className="dec count"
                                        onClick={() => {
                                            if (count == 1) return;
                                            setCount(count - 1);
                                        }}
                                    >
                                        <FiMinus />
                                    </button>
                                    <div className="countText">{count}</div>
                                    <button
                                        className="inc count"
                                        onClick={() => {
                                            if (count > quantity) return;
                                            setCount(count + 1);
                                        }}
                                    >
                                        <FiPlus color="white" />
                                    </button>
                                </div>
                            </div>
                            <div className="price">&#8358;{ItemPrice}</div>
                        </div>
                        <button
                            className="add-to-cart"
                            onClick={() => {
                                const item = {
                                    id,
                                    name,
                                    count,
                                    ItemPrice,
                                    imgSrc,
                                    quantity,
                                    price,
                                };
                                AddItemToCart(item);
                                setModal(false);
                                Notification(
                                    "success",
                                    "Item Added!",
                                    "Your Item has been successfuly added to Your Cart!"
                                );
                            }}
                        >
                            <FiPlus size="1.5em" color="white" />
                            <p className="m-0 ml-2">Add Item to Cart</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default EachProductModal;
