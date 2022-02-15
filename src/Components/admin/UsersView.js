import React, { useContext, useEffect, useState, useMemo } from "react";
import { Table } from "../../Utils/Table";
import { UsersColumn } from "../../Utils/TableColumn";
import "react-pro-sidebar/dist/css/styles.css";
import { db } from "../../Config/Config";

export const UsersView = () => {
  const [usersData, setusersData] = useState([]);

  //get catagories from db
  useEffect(() => {
    db.collection("users").onSnapshot((snapshot) => {
      let prevUsers = [];
      snapshot.forEach((doc) => {
        prevUsers.push({
          ID: doc.id,
          ...doc.data(),
        });
        setusersData([...prevUsers]);
      });
    });
  }, []);

  return (
    <div className="container ">
      <h3>
        <span className="badge bg-light text-success">Users:  {usersData.length}</span>
      </h3>
      <div className="">
        <Table data={usersData} Columns={UsersColumn}></Table>
      </div>
    </div>
  );
};
