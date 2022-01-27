import React, { useState } from 'react'
import {db } from '../../Config/Config'
 import { useHistory } from 'react-router-dom'
import { ToastAlert } from '../../Utils/Toast';

export const AddCatagory = () => {
  const history = useHistory();

  const [catagoryName, setCatagoryName] = useState("");
  const [error, setError] = useState("");

  // add new Catagory to db
  const addCatagory = (e) => {
    e.preventDefault();
    db.collection("Catagories")
      .add({
        Catagory_Name: catagoryName,
      })
      .then(() => {
        setCatagoryName("");
        setError("");
        ToastAlert("Add Catagory success");
      })
      .catch((err) => setError(err.message));
  };

  const handleBack = () => {
    //handle to admin dashboard
    history.push("/dashboard");
  };
  return (
    <div className="container">
      <br />
      <h2>ADD Catagory</h2>
      <hr />
      <form autoComplete="off" className="form-group" onSubmit={addCatagory}>
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
        <button onClick={handleBack} className="btn btn-success btn-md  m-4">
          Back
        </button>
      </form>
      {error && <span className="error-msg">{error}</span>}
    </div>
  );
}