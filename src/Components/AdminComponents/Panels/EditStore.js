import React, { useContext, useEffect } from "react";
import { CartContext } from "../../../utils/Contexts";
import ItemCard from "./ItemCard";
function EditStore() {
    const { products } = useContext(CartContext);

    const productsJSX = products.map((product, index) => {
        return <ItemCard key={index} props={product} />;
    });
    return (
        <div className="editProduct">
            <h4>Edit Store</h4>
            <div className="container my-4">
                <div className="row justify-content-between flex-wrap" style={{ gap: 20 }}>
                    <SearchComponent />
                    <Category />
                </div>
            </div>
            <div className="editList">{productsJSX}</div>
        </div>
    );
}

export default EditStore;

function SearchComponent() {
    const { products, setProducts, constProduct } = useContext(CartContext);
    async function search(text) {
        if (text == "") return setProducts(constProduct);
        const newList = constProduct.filter((pro) => {
            let searchtext = pro.productName.toLowerCase();
            return searchtext.match(text.trim().toLowerCase());
        });
        return setProducts(newList);
    }

    useEffect(() => {
        return () => {
            setProducts(constProduct);
        };
    }, []);
    return (
        <form className="form-row">
            <div className="form-group mb-0">
                <input
                    type="text"
                    onChange={(e) => {
                        search(e.target.value);
                    }}
                    className="form-control"
                    placeholder="Search Products"
                />
            </div>
        </form>
    );
}

function Category() {
    const { setProducts, constProduct } = useContext(CartContext);
    async function filter({ target: { value } }) {
        if (value == "ALL") return setProducts(constProduct);
        const newList = constProduct.filter((pro) => {
            return pro.productCategory.match(value);
        });
        return setProducts(newList);
    }
    useEffect(() => {
        return () => {
            setProducts(constProduct);
        };
    }, []);
    return (
        <div>
            <span style={{ color: "var(--main)" }}>Filter by Category: </span>
            <select name="category" id="category" className="mt-2" onChange={filter}>
                <option value="ALL">ALL</option>
                <option value="SCRUB">SCRUB</option>
                <option value="SET">SET</option>
                <option value="OIL">OIL</option>
                <option value="FACE AND BODY CREAM">FACE AND BODY CREAM</option>
                <option value="TONER, WIPES AND MASK">TONER, WIPES AND MASK</option>
                <option value="SOAP">SOAP</option>
            </select>
        </div>
    );
}
