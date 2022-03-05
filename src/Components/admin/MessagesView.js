import React, { useEffect, useState } from "react";
import { PanelView } from "./PanelView";
import "react-pro-sidebar/dist/css/styles.css";
import { orderBy } from "lodash";
import { db } from "../../Config/Config";


export const MessagesView = () => {
  const [MessagesData, setMessagesData] = useState([]);
  const [filterMessages, setfilterMessages] = useState([]);
  const [messagesTotal, setmessagesTotal] = useState(0);
  const [messagesUnread, setmessagesUnread] = useState(0);
  const [dateFilter, setdateFilter] = useState("");

  //get messages values from db
  useEffect(() => {
    db.collection("Messages").onSnapshot((snapshot) => {
      let prevMessage = [];
      snapshot.forEach((doc) => {
        prevMessage.push({
          ID: doc.id,
          DateCreate: doc.data().DateCreate.toMillis(),
          ...doc.data(),
        });
        setMessagesData([...prevMessage]);
      });
    });
  }, []);

  // filter messages data UNRead.lenth - Filter Desc
  useEffect(() => {
    if (MessagesData.length !== 0) {
      setmessagesTotal(MessagesData.length);

      const unRead = [...MessagesData];
      const unRead2 = unRead.filter((item) => !item.IsRead);
      setmessagesUnread(unRead2.length);
      setfilterMessages(filterMessagesDesc());
    }
  }, [MessagesData]);

  // return filter data-Desc
  const filterMessagesDesc = () => {
    return orderBy(MessagesData, "DateCreate", "desc");
  };

  // filter data By Date
  const filterArrayByDate = (value) => {
    setdateFilter(value);
    const arr = [];
    MessagesData.map((or) => {
      let date = new Date(or.DateCreate.toMillis());
      let dateS =
        date.getFullYear() +
        "-" +
        (date.getMonth() < 10
          ? "0" + parseInt(date.getMonth() + 1)
          : parseInt(date.getMonth() + 1)) +
        "-" +
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());
      if (value === dateS) {
        arr.push(or);
      }
    });
    setfilterMessages(arr);
  };

  const cancleDateB = () => {
    setdateFilter("");
    setfilterMessages(filterMessagesDesc());
  };
  // update in db the message to Read
  const UpdateReadMessage = (message) => {
    db.collection("Messages").doc(message.ID).update({
      IsRead: true,
    });
  };
  // delete message from db
  const DeleteMessage = (message) => {
    db.collection("Messages").doc(message.ID).delete();
  };
  return (
    <div className="container ">
      <h3>
        <span className="badge bg-light text-success p-4">
          Messages Details:
        </span>
      </h3>
      <PanelView
        cardOne={messagesTotal}
        cardOneText={"Messages Total..."}
        cardTwo={messagesUnread}
        cardTwoText={"Total UnRead..."}
        cardThree={"?"}
        cardThreeText={"Newest Message"}
        cardFor={"?"}
        cardForText={""}
      />
      <h1></h1>
      <h3>
        {" "}
        <span className="badge bg-light text-success p-4">Messages:</span>
      </h3>
      <label className="m-3 p-3 text-success">Filter Messages By Date...</label>
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
        ></button>
      </div>
      <br />
      <div className="accordion" id="accordionExample">
        {filterMessages.map((mes) => (
          <div className="accordion-item" key={mes.ID}>
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button"
                data-bs-toggle="collapse"
                data-bs-target={"#a" + mes.ID}
                aria-expanded="true"
                aria-controls={"a" + mes.ID}
              >
                <button
                  className={
                    mes.IsRead == true
                      ? "btn btn-outline-success m-2 fa fa-bookmark"
                      : "btn btn-outline-danger m-2 fa fa-bookmark"
                  }
                  onClick={() => UpdateReadMessage(mes)}
                ></button>
                <button
                  className="btn btn-outline-danger m-2 fa fa-trash"
                  onClick={() => DeleteMessage(mes)}
                ></button>
                <span
                  className={
                    mes.IsRead == true ? "text-success p-3" : "text-danger p-3"
                  }
                >
                  {new Date(mes.DateCreate.toMillis()).toLocaleString("en-GB") +
                    "  " +
                    mes.Email}
                </span>
              </button>
            </h2>

            <div
              id={"a" + mes.ID}
              className="accordion-collapse collapse"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <span>{mes.Message}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      ;
    </div>
  );
};
