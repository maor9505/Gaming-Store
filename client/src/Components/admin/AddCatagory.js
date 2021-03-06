import axios from 'axios';
import React, { useState} from 'react'
import {db } from '../../Config/Config'
import { ToastAlert } from '../../Utils/Toast';

export const AddCatagory = () => {
  const [catagoryName, setCatagoryName] = useState("");
  const [error, setError] = useState("");
 
  // add new Catagory to db
  const addCatagoryToDB =async (e) => {
    e.preventDefault();
    try{
    const res = axios.post("/category/addCategory", {
      catagoryName: catagoryName,
    });
        setCatagoryName("");
        setError("");
        ToastAlert("Add Catagory success");
  }catch(err){
    setError(err)
  }
  };
  return (
    <div className="container">
      <br />
      <h2>ADD Catagory</h2>
      <hr />
      <form
        className="form-group"
        onSubmit={addCatagoryToDB}
      >
        <label htmlFor="product-name">Catagory Name</label>
        <input
          type="text"
          className="form-control"
          required
          onChange={(e) => setCatagoryName(e.target.value)}
          value={catagoryName}
        />
        <br />
        <button type="submit" className="btn btn-success btn-md ">
          ADD
        </button>
      </form>
      {error && <span className="error-msg">{error}</span>}
    </div>
  );
}