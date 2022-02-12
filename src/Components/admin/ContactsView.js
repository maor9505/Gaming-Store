import React, { useEffect, useState } from "react";
import { Table } from "../../Utils/Table";
import { PanelView } from "./PanelView";
import "react-pro-sidebar/dist/css/styles.css";
import { orderBy } from "lodash";
import { db } from "../../Config/Config";


export const ContactsView = () => {
  const [contactsData, setcontactsData] = useState([]);
  const [filterContacts, setfilterContacts] = useState([]);
  const [contactsTotal, setcontactsTotal] = useState(0);
  const [contactsUnread, setcontactsUnread] = useState(0);
  const [dateFilter, setdateFilter] = useState("");

  //get contacts values from db
  useEffect(() => {
    db.collection("Contact").onSnapshot((snapshot) => {
      let prevContacts = [];
      snapshot.forEach((doc) => {
        prevContacts.push({
          ID: doc.id,
          DateCreate: doc.data().DateCreate.toMillis(),
          ...doc.data(),
        });
        setcontactsData([...prevContacts]);
      });
    });
  }, []);


  // filter contacts data UNRead.lenth - Filter Desc
  useEffect(() => {
    if (contactsData.length != 0) {
      setcontactsTotal(contactsData.length);

      const unRead = [...contactsData];
      const unRead2 = unRead.filter((item) => !item.IsRead);
      setcontactsUnread(unRead2.length);
      setfilterContacts(filterContactsDesc());
    }
  }, [contactsData]);

  // return filter data-Desc
  const filterContactsDesc = () => {
    return orderBy(contactsData, "DateCreate", "desc");
  };

  // filter data By Date
  const filterArrayByDate = (value) => {
    setdateFilter(value);
    const arr = [];
    contactsData.map((or) => {
      let date = new Date(or.DateCreate.toMillis());
      let dateS =
        date.getFullYear() +
        "-" +
        ((date.getMonth() < 10)
          ? "0" + parseInt(date.getMonth() + 1)
          : parseInt(date.getMonth() + 1))+
        "-" +
        ((date.getDate() < 10)
          ? "0" + date.getDate()
          : date.getDate());
      if (value === dateS) {
        arr.push(or);
      }
    });
    setfilterContacts(arr);
  };

  const cancleDateB = () => {
    setdateFilter("");
    setfilterContacts(filterContactsDesc());
  };
  // update in db the message to Read
  const UpdateReadContact = (contact) =>
  {
    db.collection('Contact').doc(contact.ID).update({
        IsRead:true
    })
  }
  // delete contact from db 
  const DeleteContact = (contact) => {
    db.collection("Contact").doc(contact.ID).delete();
  };
  return (
    <div className="container ">
      <h3>
        <span className="badge bg-light text-success p-4">Orders Details:</span>
      </h3>
      <PanelView
        cardOne={contactsTotal}
        cardOneText={"Contacts Total..."}
        cardTwo={contactsUnread}
        cardTwoText={"Total UnRead..."}
        cardThree={"?"}
        cardThreeText={"Newest Contact"}
        cardFor={"?"}
        cardForText={""}
      />
      <h1></h1>
      <h3>
        {" "}
        <span className="badge bg-light text-success p-4">Contacts:</span>
      </h3>
      <label className="m-3 p-3 text-success">Filter Contacts By Date...</label>
      <div className="d-inline">
        <input
          type="date"
          className=" col-3 p-2"
          onChange={(e) => filterArrayByDate(e.target.value)}
          value={dateFilter}
        />
        <button
          className="btn btn-success btn-md m-3 fa fa-window-close "
          onClick={() => cancleDateB()}
        >
        </button>
      </div>
      <br />
      <div className="accordion" id="accordionExample">
        {filterContacts.map((con) => (
          <div className="accordion-item" key={con.ID}>
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button"
                data-bs-toggle="collapse"
                data-bs-target={"#a" + con.ID}
                aria-expanded="true"
                aria-controls={"a" + con.ID}
              >
                <button
                  className={
                    con.IsRead == true
                      ? "btn btn-outline-success m-2 fa fa-bookmark"
                      : "btn btn-outline-danger m-2 fa fa-bookmark"
                  }
                  onClick={() => UpdateReadContact(con)}
                ></button>
                <button
                  className="btn btn-outline-danger m-2 fa fa-trash"
                  onClick={() => DeleteContact(con)}
                ></button>
                <span
                  className={
                    con.IsRead == true ? "text-success p-3" : "text-danger p-3"
                  }
                >
                  {new Date(con.DateCreate.toMillis()).toLocaleString("en-GB") +
                    "  " +
                    con.Email}
                </span>
              </button>
            </h2>

            <div
              id={"a" + con.ID}
              className="accordion-collapse collapse"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <span>{con.Message}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      ;
    </div>
  );
};
