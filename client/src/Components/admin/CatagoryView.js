import React, { useEffect, useState} from "react";
import { Table } from "../../Utils/Table";
import { CatagoryColumn } from "../../Utils/TableColumn";
import "react-pro-sidebar/dist/css/styles.css";
import { db } from "../../Config/Config";
import axios from "axios";

export const CatagoryView = () => {
  const [catagoryData, setCategoryData] = useState([]);
 

  //get catagories from db
  useEffect(async() => {
   const res =  await axios.get("/category/getCategories");
    setCategoryData(res.data.categories);

  }, []);


  return (
    <div className="container ">
      <h3>
        <span className="badge bg-light text-success">Catagories</span>
      </h3>
      <div className="">
        <Table data={catagoryData} Columns={CatagoryColumn}></Table>
      </div>
    </div>
  );
};
