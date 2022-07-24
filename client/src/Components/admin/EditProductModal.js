import { Modal, Button } from "react-bootstrap";
import { ic_mode_edit } from "react-icons-kit/md/ic_mode_edit";
import { Icon } from "react-icons-kit";
import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { storage, db } from "../../Config/Config";
import { useHistory } from "react-router-dom";
import { ToastAlert } from "../../Utils/Toast";
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
  const history = useHistory();
  const [productName, setProductName] = useState(product.ProductName);
  const [productPrice, setProductPrice] = useState(product.ProductPrice);
    const [maxQty, setmaxQty] = useState(product.MaxQty);
  const [productImg, setProductImg] = useState(product.ProductImg);
  const [description, setDescription] = useState(product.Description);
  const [catagory, setCatagory] = useState(product.Catagory);
  const [catagoryAge, setCatagoryAge] = useState(product.CatagoryAge);
  const [catagoryOption, setcatagoryOption] = useState([]);
    const [exisImg, setexisImg] = useState(true);
  const [error, setError] = useState("");
  const types = ["image/png", "image/jpeg"]; // image types

  useEffect(() => {
    db.collection("Catagories").onSnapshot((snapshot) => {
      setcatagoryOption(
        snapshot.docs.map((doc) => ({ name: doc.data().Catagory_Name }))
      );
    });
  }, []);
  const productImgHandler = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile && types.includes(selectedFile.type)) {
      setProductImg(selectedFile);
      setexisImg(false);
      setError("");
    } else {
      setProductImg(null);
      setError("Please select a valid image type (jpg or png)");
    }
  };

  // edit product
  const EditProduct = (e) => {
    e.preventDefault();
    const date = new Date();

    if(!exisImg){

    const uploadTask = storage
      .ref(`product-images/${productImg.name}`)
      .put(productImg);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      },
      (err) => setError(err.message),
      () => {
        storage
          .ref("product-images")
          .child(productImg.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("Products")
              .doc(product.ID)
              .update({
                ProductName: productName,
                ProductPrice: Number(productPrice),
                ProductImg: url,
                Description: description,
                Catagory: catagory,
                CatagoryAge: catagoryAge,
                MaxQty: maxQty,
                Views: product.Views,
                Sales: product.Sales,
                DateCreate: date,
                UplodeDate: date.getTime(),
              })
              .then(() => {
               ToastAlert("this product is Update");
                document.getElementById("file").value = "";
              })
              .catch((err) => setError(err.message));
          });
      }
    );
    }
    else{
        db.collection("Products")
          .doc(product.ID)
          .update({
            ProductName: productName,
            ProductPrice: Number(productPrice),
            ProductImg: productImg,
            Description: description,
            Catagory: catagory,
            CatagoryAge: catagoryAge,
            Views: product.Views,
            Sales: product.Sales,
            DateCreate: date,
            UplodeDate: date.getTime(),
          })
          .then(() => {
            ToastAlert("this product is Update ");
          })
          .catch((err) => setError(err.message));
            }
  };

  return (
    <div className="container">
      <br />
      {/* <button onClick={getCatgories}>????</button> */}
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
          onChange={(e) => setmaxQty(e.target.value)}
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
          // value={productImg}
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