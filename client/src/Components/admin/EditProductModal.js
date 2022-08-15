import { Modal, Button } from "react-bootstrap";
import { ic_mode_edit } from "react-icons-kit/md/ic_mode_edit";
import { Icon } from "react-icons-kit";
import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { storage, db } from "../../Config/Config";
import { useHistory } from "react-router-dom";
import { ToastAlert } from "../../Utils/Toast";
import axios from 'axios'
export  const EditProductModal= ({product}) => {
      const [show, setShow] = useState(false);

  return (
    <>
      <Button variant="light" onClick={() => setShow(true)}>
        <Icon icon={ic_mode_edit} size={24} />
      </Button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Edit Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditProducts product={product} />
        </Modal.Body>
      </Modal>
    </>
  );
};
// edit product from Modal and update in db 
const EditProducts = ({ product }) => {
  console.log('product')
  console.log(product)
  const [productName, setProductName] = useState(product.ProductName);
  const [productPrice, setProductPrice] = useState(product.ProductPrice);
    const [maxQty, setMaxQty] = useState(product.MaxQty);
  const [productImg, setProductImg] = useState(product.ProductImg);
  const [description, setDescription] = useState(product.Description);
  const [category, setCategory] = useState(product.Catagory);
  const [categoryAge, setCategoryAge] = useState(product.CatagoryAge);
  const [categoryOption, setCategoryOption] = useState([]);
    const [existImg, setExistImg] = useState(true);
  const [error, setError] = useState("");
  const types = ["image/png", "image/jpeg"]; // image types

  useEffect(async () => {
    const res = await axios.get("/category/getCategories");
    console.log("catagories");
    console.log(res.data.categories);
    setCategoryOption([...res.data.categories]);
  }, []);

  const productImgHandler = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile && types.includes(selectedFile.type)) {
      setProductImg(selectedFile);
      setExistImg(false);
      setError("");
    } else {
      setProductImg(null);
      setError("Please select a valid image type (jpg or png)");
    }
  };

  // edit product
  const EditProduct = async(e) => {
    e.preventDefault();
 const productForm=  new FormData();
     productForm.append("productName", productName);
     productForm.append("productPrice", productPrice);
     productForm.append("maxQty", maxQty);
     productForm.append("productImg", productImg);
     productForm.append("description", description); 
    productForm.append("category", category);
    productForm.append("categoryAge", categoryAge);
    productForm.append("existImg", existImg);
    productForm.append("productID", product.ID);
   try{
      const res = await axios.post("/products/editProducts",productForm);
       setProductName("");
       setProductPrice(0);
       setMaxQty(0);
       setProductImg("");
       setDescription("");
       setCategory("");
       setCategoryAge("");
       setError("");
       setExistImg(true);
       ToastAlert("Edit product success ");
       document.getElementById("file").value = "";
    }catch(err){
      setError(err);
    }
  };

  return (
    <div className="container">
      <br />
      <hr />
      <form autoComplete="off" className="form-group" onSubmit={EditProduct}>
        <label htmlFor="product-name">Product Name:</label>
        <input
          type="text"
          className="form-control"
          required
          onChange={(e) => setProductName(e.target.value)}
          value={productName}
        />
        <br />
        <label>Product Price:</label>
        <input
          type="number"
          className="form-control"
          required
          onChange={(e) => setProductPrice(e.target.value)}
          value={productPrice}
        />
        <br />
        <label>Max Quantity:</label>
        <input
          type="number"
          className="form-control"
          required
          onChange={(e) => setMaxQty(e.target.value)}
          value={maxQty}
        />
        <br />
        <label>Description</label>
        <textarea
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
            <option key={ca.name} value={ca.Catagory_Name}>
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
          <option>Choose Catagory age</option>
          <option value="1">3-16</option>
          <option value="2">16-99</option>
        </select>
        <label htmlFor="product-img">Product Image</label>
        <input
          type="file"
          className="form-control"
          id="file"
          
          onChange={productImgHandler}
        />
        <br />
        <button type="submit" className="btn btn-success btn-md ">
          Edit
        </button>
      </form>
      {error && <span className="error-msg">{error}</span>}
    </div>
  );
};