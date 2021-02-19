import React from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import EachProduct from "./EachProduct";
import { Link } from "react-router-dom";
function Shop({ props: AddItemToCart, products: newest }) {
    return (
        <section id="shop" className="menu section-bg">
            <div className="container" data-aos="fade-up">
                <div className="section-title">
                    <h2>Products</h2>
                    <div className="shopList">
                        <p>Check Our latest Products</p>
                        <Link to="/store" className="rest cursor">
                            <p className="mr-2">Veiw all Products</p>
                            <span>
                                <BiRightArrowAlt size="1.25rem" />
                            </span>
                        </Link>
                    </div>
                </div>

                <div className="row menu-container" data-aos="fade-up" data-aos-delay="200">
                    <ProductsList products={newest} AddToCart={AddItemToCart} />
                </div>
            </div>
        </section>
    );
}
function ProductsList({ products: newest, AddToCart: AddItemToCart }) {
    const ProductsJSX = newest.map(
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

export default Shop;
