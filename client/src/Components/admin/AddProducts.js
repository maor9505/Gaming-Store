import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { storage, db } from "../../Config/Config";
import { ToastAlert } from "../../Utils/Toast";
toast.configure();

export const AddProducts = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [maxQty, setMaxQty] = useState(0);
  const [productImg, setProductImg] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [categoryAge, setCategoryAge] = useState("");
  const [categoryOption, setCategoryOption] = useState([]);
  const [error, setError] = useState("");
  const types = ["image/png", "image/jpeg"]; // image types

  // get catagories from db
  useEffect(async () => {
    const res = await axios.get("/category/getCategories");
    setCategoryOption(res.data.categories);
  }, []);

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

   const addProductDB = (e) => {
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
                 Catagory: category,
                 CatagoryAge: categoryAge,
                 Views: 0,
                 Sales: 0,
                 MaxQty: maxQty,
                 DateCreate: date,
                 UplodeDate: date.getTime(),
               })
               .then(() => {
                 setProductName("");
                 setProductPrice(0);
                 setMaxQty(0);
                 setProductImg("");
                 setDescription("");
                 setCategory("");
                 setCategoryAge("");
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
      <form autoComplete="off" className="form-group" onSubmit={addProductDB}>
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
          onChange={(e) => setMaxQty(e.target.value)}
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
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        >
          <option>Choose Category</option>
          {categoryOption.map((ca) => (
            <option key={ca.name} value={ca.name}>
              {ca.name}
            </option>
          ))}
        </select>
        <br />
        <select
          className="form-select"
          aria-label="Default select example"
          onChange={(e) => setCategoryAge(e.target.value)}
          value={categoryAge}
        >
          <option>Choose Category age</option>
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
      </form>
      {error && <span className="error-msg">{error}</span>}
    </div>
  );
};
