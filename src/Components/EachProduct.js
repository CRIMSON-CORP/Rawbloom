import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { FiPlus } from "react-icons/fi";
import EachProductModal from "./EachProductModal";
function EachProduct({
    props: { quantity, id, description, name, imgSrc, category, price, AddItemToCart },
}) {
    const [modal, setModal] = useState(false);
    return (
        <div className={`item shadow ${category}`}>
            <img src={imgSrc} className="menu-img" alt="" />
            <div className="menu-content">
                <p className="product-name">{name}</p>
                <div className="menu-ingredients">
                    {description == null || description === "" ? "No Description" : description}
                </div>
            </div>
            <div className="cta">
                <button
                    className={`add-to-cart shadow ${quantity === 0 && "out-of-stock-btn"}`}
                    onClick={() => setModal(true)}
                    disabled={quantity === 0}
                >
                    <FiPlus size="2em" color="white" />
                </button>
                {quantity == null || quantity == 0 ? (
                    <span className={"out-of-stock"}>Out of Stock</span>
                ) : (
                    <span className="price">&#8358;{price}</span>
                )}
            </div>
            <CSSTransition in={modal} classNames="show" timeout={400} unmountOnExit>
                <EachProductModal
                    props={{
                        quantity,
                        id,
                        description,
                        name,
                        imgSrc,
                        category,
                        price,
                        setModal,
                        AddItemToCart,
                    }}
                />
            </CSSTransition>
        </div>
    );
}

export default EachProduct;
