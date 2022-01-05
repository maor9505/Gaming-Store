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
  useEffect(() => {
    db.collection("Contact").onSnapshot((snapshot) => {
      let prevContacts = [];
      snapshot.forEach((doc) => {
        prevContacts.push({
          ID: doc.id,
          DateCreate: doc.data().DateCreate.toMillis(),
          ...doc.data(),
        });
        console.log(prevContacts);
        setcontactsData([...prevContacts]);
      });
    });
  }, []);

  useEffect(() => {
    if (contactsData.length != 0) {
      setcontactsTotal(contactsData.length);

      const unRead = [...contactsData];
      const unRead2 = unRead.filter((item) => !item.IsRead);
      setcontactsUnread(unRead2.length);
      setfilterContacts(filterContactsDesc());
    }
  }, [contactsData]);

  const filterContactsDesc = () => {
    return orderBy(contactsData, "DateCreate", "desc");
  };

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
  const UpdateReadContact = (contact) =>
  {
    db.collection('Contact').doc(contact.ID).update({
        IsRead:true
    })
  }
  const DeleteContact = (contact) => {
    db.collection("Contact").doc(contact.ID).delete();
  };
  return (
    <div class="container ">
      <h3>
        <span class="badge bg-light text-success p-4">Orders Details:</span>
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
        <span class="badge bg-light text-success p-4">Contacts:</span>
      </h3>
      <label className="m-3 p-3 text-success">Filter Contacts By Date...</label>
      <div class="d-inline">
        <input
          type="date"
          className=" col-3 p-2"
          onChange={(e) => filterArrayByDate(e.target.value)}
          value={dateFilter}
        />
        <button
          className="btn btn-success btn-md m-3 "
          onClick={() => cancleDateB()}
        >
          <i class="fa fa-window-close"></i>
        </button>
      </div>
      <br />
      <div class="accordion" id="accordionExample">
        {filterContacts.map((con) => (
          <div class="accordion-item" key={con.ID}>
            <h2 class="accordion-header" id="headingOne">
              <button
                class="accordion-button"
                data-bs-toggle="collapse"
                data-bs-target={"#a" + con.ID}
                aria-expanded="true"
                aria-controls={"a" + con.ID}
              >
                <button
                  className={
                    con.IsRead == true
                      ? "btn btn-outline-success m-2"
                      : "btn btn-outline-danger m-2"
                  }
                  onClick={() => UpdateReadContact(con)}
                >
                  <i class="fa fa-bookmark"></i>
                </button>
                <button
                  className="btn btn-outline-danger m-2"
                  onClick={() => DeleteContact(con)}
                >
                  <i class="fa fa-trash"></i>
                </button>
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
              class="accordion-collapse collapse"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
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
