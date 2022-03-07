import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { storage, db } from "../../Config/Config";
import { useHistory } from "react-router-dom";
import { ToastAlert } from "../../Utils/Toast";
toast.configure();

export const AddProducts = () => {
  const history = useHistory();

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [maxQty, setmaxQty] = useState(0);
  const [productImg, setProductImg] = useState("");
  const [description, setDescription] = useState("");
  const [catagory, setCatagory] = useState("");
  const [catagoryAge, setCatagoryAge] = useState("");
  const [catagoryOption, setcatagoryOption] = useState([]);
  const [error, setError] = useState("");
  const types = ["image/png", "image/jpeg"]; // image types

  // get catagories from db
  useEffect(async() => {
    const catagories =  await db.collection("Catagories").get();
     setcatagoryOption(
        catagories.docs.map((doc) => ({ name: doc.data().Catagory_Name }))
      );
  }, []);

  const handleBack = () => {
    history.push("/");
  };

  // image handler check if photo uplode is success
  const productImgHandler = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile && types.includes(selectedFile.type)) {
      setProductImg(selectedFile);
      setError("");
    } else {
      setProductImg(null);
      setError("Please select a valid image type (jpg or png)");
    }
  };

  // add product to db
  const addProducToDB = (e) => {
    e.preventDefault();
    const date = new Date();
    const uploadTask = storage
      .ref(`product-images/${productImg.name}`)
      .put(productImg);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
        ToastAlert("Uplode...");
      },
      (err) => setError(err.message),
      () => {
        storage
          .ref("product-images")
          .child(productImg.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("Products")
              .add({
                ProductName: productName,
                ProductPrice: Number(productPrice),
                ProductImg: url,
                Description: description,
                Catagory: catagory,
                CatagoryAge: catagoryAge,
                Views: 0,
                Sales: 0,
                MaxQty: maxQty,
                DateCreate: date,
                UplodeDate: date.getTime(),
              })
              .then(() => {
                setProductName("");
                setProductPrice(0);
                setmaxQty(0);
                setProductImg("");
                setDescription("");
                setCatagory("");
                setCatagoryAge("");
                setError("");
                ToastAlert("this product is Add ");
                document.getElementById("file").value = "";
              })
              .catch((err) => setError(err.message));
          });
      }
    );
  };

  return (
    <div className="container">
      <br />
      <h2>Add Product:</h2>
      <hr />
      <form autoComplete="off" className="form-group" onSubmit={addProducToDB}>
        <label htmlFor="product-name">Product Name</label>
        <input
          type="text"
          className="form-control"
          required
          onChange={(e) => setProductName(e.target.value)}
          value={productName}
        />
        <br />
        <label>Product Price</label>
        <input
          type="number"
          className="form-control"
          required
          onChange={(e) => setProductPrice(e.target.value)}
          value={productPrice}
        />
        <br />
        <label>Max Quantity</label>
        <input
          type="number"
          className="form-control"
          required
          onChange={(e) => maxQty(e.target.value)}
          value={maxQty}
        />
        <br />
        <label>Description</label>
        <input
          type="text"
          className="form-control"
          required
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <br />
        <select
          className="form-select"
          aria-label="Default select example"
          onChange={(e) => setCatagory(e.target.value)}
          value={catagory}
        >
          <option>Choose Catagory</option>
          {catagoryOption.map((ca) => (
            <option key={ca.name} value={ca.name}>
              {ca.name}
            </option>
          ))}
        </select>
        <br />
        <select
          className="form-select"
          aria-label="Default select example"
          onChange={(e) => setCatagoryAge(e.target.value)}
          value={catagoryAge}
        >
          <option>Choose Catagory age</option>
          <option value="1">3-16</option>
          <option value="2">16-99</option>
        </select>
        <label htmlFor="product-img">Product Image</label>
        <input
          type="file"
          className="form-control"
          id="file"
          required
          onChange={productImgHandler}
        />
        <br />
        <button type="submit" className="btn btn-success btn-md ">
          ADD
        </button>
        <button onClick={handleBack} className="btn btn-success btn-md  m-4">
          Back
        </button>{" "}
      </form>
      {error && <span className="error-msg">{error}</span>}
    </div>
  );
};
