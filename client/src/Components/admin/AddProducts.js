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

  console.log('categoris option')
  console.log(categoryOption);
  // get catagories from db
  useEffect(async () => {
    const res = await axios.get("/category/getCategories");
    console.log('catagories')
    console.log(res.data.categories);
    setCategoryOption([...res.data.categories]);
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

   const addProductDB = async(e) => {
     e.preventDefault();
     const productForm=  new FormData();
     productForm.append("productName", productName);
     productForm.append("productPrice", productPrice);
     productForm.append("maxQty", maxQty);
     productForm.append("productImg", productImg);
     productForm.append("description", description); 
    productForm.append("category", category);
    productForm.append("categoryAge", categoryAge);
   try{
      const res = await axios.post("/products/addProducts",productForm);

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
    }catch(err){
      setError(err);
    }
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
            <option key={ca.Catagory_Name} value={ca.Catagory_Name}>
              {ca.Catagory_Name}
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
          name="productImg"
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
