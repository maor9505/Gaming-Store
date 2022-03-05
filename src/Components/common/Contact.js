import React, { useState } from "react";
import "../../styles/Contact.css";
import { db } from "../../Config/Config";
import { ToastAlert } from "../../Utils/Toast";


export const Contact = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setEror] = useState("");

  const handleSumbit = (e) => {
    const date = new Date();
    const time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    e.preventDefault();
    db.collection("Messages")
      .doc()
      .set({
        Name: name,
        Email: email,
        PhoneNumber: phone,
        Message: message,
        DateCreate: date,
        IsRead:false
      })
      .then(() => {
        setEmail("");
        setMessage("");
        setName("");
        setPhone("");
        ToastAlert("Thank you we will replay to you soon!,"+name);  
    })
      .catch((err) => setEror(err.message));
  };

  return (
    <div className="container contact-form">
      <div className="contact-image">
        <img
          className="img-fluid"
          src="https://image.ibb.co/kUagtU/rocket_contact.png"
          alt="rocket_contact"
        />
      </div>
      <form onSubmit={handleSumbit}>
        <h3>Drop Us a Message</h3>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <input
                type="text"
                name="txtName"
                className="form-control mb-3 border-primary"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control mb-3 border-primary"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control mb-3 border-primary"
                placeholder="Your Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>
          {error && <span className="error-msg bg-warning">{error}</span>}
          <div className="col-md-6">
            <div className="form-group ">
              <textarea
                className="form-control border-primary p-5 "
                placeholder="Your Message...."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>
          </div>
          <div className="form-group">
            <input
              type="submit"
              className="btn btn-lg btn-outline-success mt-2 text-dark  border-primary"
              value="Send"
            />
          </div>
        </div>
      </form>
    </div>
  );
};
