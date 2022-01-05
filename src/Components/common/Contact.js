import React, { useState, useContext } from "react";
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
    db.collection("Contact")
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
        ToastAlert("Thank you for your application,"+name);  
    })
      .catch((err) => setEror(err.message));
  };

  return (
    <div class="container contact-form">
      <div class="contact-image">
        <img
          src="https://image.ibb.co/kUagtU/rocket_contact.png"
          alt="rocket_contact"
        />
      </div>
      <form onSubmit={handleSumbit}>
        <h3>Drop Us a Message</h3>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <input
                type="text"
                name="txtName"
                class="form-control mb-3 border-success"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div class="form-group">
              <input
                type="email"
                class="form-control mb-3 border-success"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div class="form-group">
              <input
                type="text"
                class="form-control mb-3 border-success"
                placeholder="Your Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>
          {error && <span className="error-msg bg-warning">{error}</span>}
          <div class="col-md-6">
            <div class="form-group ">
              <textarea
                class="form-control border-success p-5 "
                placeholder="Your Message...."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>
          </div>
          <div class="form-group">
            <input
              type="submit"
              class="btn btn-lg btn-outline-success mt-2 text-dark  border-success"
              value="Send"
            />
          </div>
        </div>
      </form>
    </div>

  );
};
