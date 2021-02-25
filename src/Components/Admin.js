import React, { useState } from "react";
import Header from "./Header";
import {} from "react-icons";
import { MdArrowForward } from "react-icons/md";
import { Notification } from "../utils/utils";
import { Route, Link } from "react-router-dom";
import firebase from "../utils/firebase";
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
        if (
            loginDetails.username !== process.env.REACT_APP_ADMIN_USERNAME ||
            loginDetails.password !== process.env.REACT_APP_ADMIN_PASSWORD
        ) {
            setLoginDetails({ username: "", password: "" });
            Notification(
                "danger",
                "Invalid Login Datails",
                "Either your username or pasword is not correct, Try again!"
            );
        } else {
            setLoggedIn(true);
        }
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
                    <div className="row panel-wrapper">
                        <nav className="nav navbar d-block">
                            <ul className="navlinks">
                                <Link to="/admin/productUpload">Upload Product</Link>
                                <hr />
                                <Link to="/admin/orders">Order Requests</Link>
                            </ul>
                        </nav>
                        <div className="panel">
                            <Route path={["/admin/productUpload", "/admin"]} exact>
                                <ProductUpload />
                            </Route>
                            <Route path="/admin/orders">
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
        productPrice: 0,
        productQuantity: 1,
        productCategory: "",
        imgURL: "",
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
        if (!types.includes(image.type)) {
            return Notification("danger", "Invalid file type", "Please upload a Picture");
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
                setStatus(`Uploading... ${progress}% Done...`);
            },
            (error) => {
                setStatus(error.message);
            },
            () => {
                setStatus(`Uploading Data...`);
                uploadTask.snapshot.ref.getDownloadURL().then(async (downloadURL) => {
                    setData((prev) => {
                        return { ...prev, imgURL: downloadURL };
                    });
                    try {
                        const db = firebase.firestore();
                        const Ref = await db.collection("store").add(Data);
                        setStatus("Upload Finished!");
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
function Orders() {
    return <div>Order Requests</div>;
}
