import React, {  useEffect, useState } from "react";
import { Table } from "../../Utils/Table";
import { UsersColumn } from "../../Utils/TableColumn";
import "react-pro-sidebar/dist/css/styles.css";
import { db } from "../../Config/Config";
import _ from 'lodash'
export const UsersView = () => {
  const [usersData, setUsersData] = useState([]);
  const [filterUsers, setFilterUsers] = useState([]);
  //get users from db
  useEffect(() => {
    db.collection("users").onSnapshot((snapshot) => {
      let prevUsers = [];
      snapshot.forEach((doc) => {
        prevUsers.push({
          ID: doc.id,
          ...doc.data(),
        });
        setUsersData([...prevUsers]);
        setFilterUsers([...prevUsers]);
      });
    });
  }, []);

  //filter array by ID User
  const filterUserByID = (value) => {
    console.log(usersData)
    console.log(value)
    let user = _.find(usersData, { ID: value });
    console.log(user)
    setFilterUsers(user ? [user] : []);
  };
  const handleResetButton = () => {
    document.getElementById("idUser").value = "";
    setFilterUsers([...usersData]);
  };
  return (
    <div className="container ">
      <h3>
        <span className="badge bg-light text-success">
          Users: {usersData.length}
        </span>
      </h3>
      <div className="d-inline d-flex">
        <input
          id="idUser"
          type="text"
          className=" col-3  m-2"
          onChange={(e) => filterUserByID(e.target.value)}
          placeholder="Filter User By ID:"
        />
        <button
          className="btn btn-success btn-md m-3 "
          onClick={() => handleResetButton()}
        >
          <i className="fa fa-window-close"></i>
        </button>
      </div>
      <div className="">
        <Table data={filterUsers} Columns={UsersColumn}></Table>
      </div>
    </div>
  );
};
