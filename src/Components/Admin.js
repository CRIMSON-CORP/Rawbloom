import React, { useState, useEffect } from "react";
import Header from "./Header";
import {} from "react-icons";
import { MdArrowForward } from "react-icons/md";
import { Notification } from "../utils/utils";
import { Route, NavLink } from "react-router-dom";
import firebase from "../utils/firebase";
import { v4 } from "uuid";
import { CSSTransition } from "react-transition-group";
function Admin() {
    const [loggedIn, setLoggedIn] = useState(false);
    return loggedIn ? <Panel /> : <Login setLoggedIn={setLoggedIn} />;
}

export default Admin;

function Login({ setLoggedIn }) {
    const [loginDetails, setLoginDetails] = useState({
        username: "",
        password: "",
    });
    function verify(e) {
        e.preventDefault();
        // if (
        //     loginDetails.username !== process.env.REACT_APP_ADMIN_USERNAME ||
        //     loginDetails.password !== process.env.REACT_APP_ADMIN_PASSWORD
        // ) {
        //     setLoginDetails({ username: "", password: "" });
        //     Notification(
        //         "danger",
        //         "Invalid Login Datails",
        //         "Either your username or pasword is not correct, Try again!"
        //     );
        // } else {
        //     setLoggedIn(true);
        // }
        setLoggedIn(true);
    }
    return (
        <div className="form_wrapper">
            <form className="admin_login" onSubmit={verify}>
                <div className="form-header">
                    <h1>Are you an Admin?</h1>
                </div>
                <div className="form-text">
                    <p>
                        <span>verify...</span>
                    </p>
                </div>
                <div className="form-group">
                    <label htmlFor="username">username</label>
                    <input
                        type="text"
                        className="username form-control"
                        value={loginDetails.username}
                        onChange={({ target: { value } }) => {
                            setLoginDetails((prev) => {
                                return { ...prev, username: value };
                            });
                        }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="password form-control"
                        value={loginDetails.password}
                        onChange={({ target: { value } }) =>
                            setLoginDetails((prev) => {
                                return { ...prev, password: value };
                            })
                        }
                    />
                </div>
                <button type="submit">
                    <MdArrowForward size="1.5rem" />
                </button>
            </form>
        </div>
    );
}

function Panel() {
    return (
        <>
            <Header
                props={{
                    LinkObj: [],
                }}
            />
            <section id="admin" className="admin section-bg" style={{ marginTop: 59 }}>
                <div className="container">
                    <div className="section-title">
                        <h2>Admin</h2>
                        <div className="shopList">
                            <p>Welcome, Admin</p>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="panel-wrapper">
                        <nav className="nav navbar d-block">
                            <ul className="navlinks">
                                <NavLink to="/admin/" exact activeClassName={"active"}>
                                    Upload Product
                                </NavLink>
                                <NavLink to="/admin/editStore" exact activeClassName={"active"}>
                                    Edit store
                                </NavLink>
                                <NavLink to="/admin/orders" activeClassName={"active"}>
                                    Order Requests
                                </NavLink>
                            </ul>
                        </nav>
                        <div className="panel">
                            <Route path={["/admin/productUpload", "/admin"]} exact>
                                <ProductUpload />
                            </Route>
                            <Route path={"/admin/editStore"} exact>
                                <EditStore />
                            </Route>
                            <Route path="/admin/orders" exact>
                                <Orders />
                            </Route>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

function ProductUpload() {
    const [Data, setData] = useState({
        productName: "",
        productDescription: "",
        productPrice: "",
        productQuantity: "",
        productCategory: "",
    });
    const [image, setImage] = useState(null);
    const [status, setStatus] = useState(null);
    function fillData({ target: { value, name } }) {
        setData((prev) => {
            return { ...prev, [name]: value };
        });
    }
    const types = ["image/jpg", "image/png", "image/jpeg"];

    function upload(e) {
        e.preventDefault();
        //  validate
        if (Data.productName == "" || Data.productDescription == "" || Data.productPrice == "") {
            return Notification(
                "danger",
                "Empty Fiels!",
                "Name, Description and Price cannot be Empty!"
            );
        }
        if (!types.includes(image.type)) {
            return Notification("danger", "Invalid file type", "Please upload a Picture");
        } else if (image.size > 250000) {
            return Notification(
                "danger",
                "Image too Large!",
                "The size of the image should not be more than 250kb!"
            );
        }
        setStatus("Preparing to Upload...");
        const StorageRef = firebase.storage().ref();
        const uploadTask = StorageRef.child(`Product images/${Data.productName}`).put(image);
        setStatus("Uploading Image...");
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                progress = Math.ceil(progress);
                setStatus(`Uploading image... ${progress}% Done...`);
            },
            (error) => {
                setStatus(error.message);
            },
            () => {
                setStatus(`Uploading Data...`);
                uploadTask.snapshot.ref.getDownloadURL().then(async (downloadURL) => {
                    Data.imgURL = downloadURL;
                    Data.productPrice = parseInt(Data.productPrice);
                    Data.productQuantity = parseInt(Data.productQuantity);
                    try {
                        const db = firebase.firestore();
                        const Ref = await db.collection("store").add(Data);
                        setStatus("Upload Finished!");
                        setData({
                            productName: "",
                            productDescription: "",
                            productPrice: "",
                            productQuantity: "",
                            productCategory: "",
                        });
                        setTimeout(() => {
                            setStatus(null);
                        }, 500);
                    } catch (err) {
                        setStatus(err.message);
                    }
                });
            }
        );
    }
    return (
        <div className="uploadProduct">
            <h4>Upload Product</h4>
            <form className="upload-form mt-3" onSubmit={upload}>
                <div className="form-group">
                    <label htmlFor="name">Product Name</label>
                    <input
                        type="text"
                        name="productName"
                        className="form-control"
                        id="name"
                        value={Data.productName}
                        onChange={fillData}
                        required={true}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="desc">Product Description</label>
                    <textarea
                        className="form-control"
                        name="desc"
                        id=""
                        cols="30"
                        rows="3"
                        name="productDescription"
                        value={Data.productDescription}
                        onChange={fillData}
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="price">Product Price</label>
                    <input
                        type="number"
                        name="productPrice"
                        className="form-control"
                        id="price"
                        value={Data.productPrice}
                        onChange={fillData}
                        required={true}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="quantity">Product Quantity</label>
                    <input
                        type="number"
                        name="productQuantity"
                        className="form-control"
                        id="quantity"
                        value={Data.productQuantity}
                        onChange={fillData}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Product category</label>
                    <input
                        type="text"
                        name="productCategory"
                        className="form-control"
                        id="category"
                        value={Data.productCategory}
                        onChange={fillData}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Product image</label>
                    <div className="upload">
                        <input
                            type="file"
                            className="image"
                            id="image"
                            onChange={(e) => setImage(e.target.files[0])}
                            required={true}
                        />
                    </div>
                </div>
                <p>{status}</p>
                <button type="submit">Upload product</button>
            </form>
        </div>
    );
}

function EditStore() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        async function getProducts() {
            try {
                var list = [];
                const db = firebase.firestore().collection("store");
                const collection = await db.get();
                await Promise.resolve(
                    collection.forEach((data) => {
                        list.push(data.data());
                    })
                );
                setProducts(list);
            } catch (error) {
                console.log(error);
            }
        }
        getProducts();
    }, [products]);
    products.length = 6;
    const productsJSX = products.map((product, index) => {
        return <ItemCard key={index} props={product} />;
    });
    return (
        <div className="editProduct">
            <h4>Edit Store</h4>
            <div className="editList">{productsJSX}</div>
        </div>
    );
}

function Orders() {
    return <div>Order Requests</div>;
}

function ItemCard({
    props: {
        productCategory,
        productDescription,
        productName,
        productPrice,
        productQuantity,
        imgURL,
        id,
    },
}) {
    const [modal, setModal] = useState(false);
    return (
        <div className={`item shadow ${productCategory}`}>
            <img src={imgURL} className="menu-img" alt="" />
            <div className="menu-content">
                <p className="product-name">
                    {productName == null || productName === ""
                        ? "No Name"
                        : productName.length > 18
                        ? productName.substr(0, 18) + "..."
                        : productName}
                </p>
                <div className="menu-ingredients">
                    {productDescription == null || productDescription === ""
                        ? "No Description"
                        : productDescription.length > 80
                        ? productDescription.substr(0, 80) + "..."
                        : productDescription}
                </div>
            </div>
            <div className="cta">
                <button className="editProductbtn">edit</button>
                <button className="deleteProductbtn" onClick={() => setModal(true)}>
                    delete
                </button>
            </div>
            {/* <CSSTransition in={modal} classNames="show" timeout={250} unmountOnExit>
                <EditModal
                    props={{
                        productCategory,
                        productDescription,
                        productName,
                        productPrice,
                        productQuantity,
                        imgURL,
                        id,
                    }}
                />
            </CSSTransition> */}
            <CSSTransition in={modal} classNames="show" timeout={250} unmountOnExit>
                <DeleteModal props={{ modal, setModal, id }} />
            </CSSTransition>
        </div>
    );
}

function DeleteModal({ props: { setModal, id } }) {
    async function deletproduct(id) {
        const db = firebase.firestore().collection("store").where("id", "==", `${id}`);
        const collection = await db.get();
        try {
            collection.forEach(async (data) => {
                data.ref
                    .delete()
                    .then(() => {
                        Notification(
                            "success",
                            "Product Deleted!",
                            "The product has been removed from your Store!"
                        );
                        setModal(false);
                    })
                    .catch((err) => {
                        Notification(
                            "danger",
                            "An Error Occured",
                            "Product could not removed from your Store!"
                        );
                    });
            });
        } catch (err) {
            console.log(err.message);
        }
    }
    return (
        <div
            className="PlaceOrderModal ProductModal"
            onClick={(e) => {
                if (e.target.classList.contains("ProductModal")) {
                    setModal(false);
                }
            }}
        >
            <div className="modalBox container edit-modal">
                <div className="row">
                    <h4>Are you sure you want to Delete this Product?</h4>
                    <div className="button">
                        <button className="cancel" onClick={() => setModal(false)}>
                            Cancel
                        </button>
                        <button className="delete" onClick={() => deletproduct(id)}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
// function EditModal({props:{productCategory,
//         productDescription,
//         productName,
//         productPrice,
//         productQuantity,
//         imgURL,
//         id,}}){
//     return()
// }
