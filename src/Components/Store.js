import React, { useState } from "react";
import EachProduct from "./EachProduct";
function Store({ props: products, Addtocart: AddItemToCart }) {
    document.querySelector("html").scrollTop = 0;
    return (
        <section id="shop" className="menu section-bg store" style={{ marginTop: 71 }}>
            <div className="container" data-aos="fade-up">
                <div className="section-title">
                    <h2>Store</h2>
                    <div className="shopList">
                        <p>Checkout all our Products</p>
                    </div>
                </div>
                <div className="row menu-container" data-aos="fade-up" data-aos-delay="200">
                    {products.length == 0 ? (
                        <h1 className="text-center">No Products for Now</h1>
                    ) : (
                        <ProductsList products={products} AddToCart={AddItemToCart} />
                    )}
                </div>
            </div>
        </section>
    );
}

function ProductsList({ products: products, AddToCart: AddItemToCart }) {
    const ProductsJSX = products.map(
        ({ quantity, id, description, name, imgSrc, category, price }) => {
            return (
                <EachProduct
                    key={id}
                    props={{
                        quantity,
                        id,
                        description,
                        name,
                        imgSrc,
                        category,
                        price,
                        AddItemToCart,
                    }}
                />
            );
        }
    );
    return ProductsJSX;
}
export default Store;
