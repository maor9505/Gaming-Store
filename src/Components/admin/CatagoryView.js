import React, { useContext, useEffect, useState, useMemo } from "react";
import { Table } from "../../Utils/Table";
import { Pagination } from "../common/Pagiantion";
import { paginate } from "../common/paginat";
import { PanelView } from "./PanelView";
import { CatagoryColumn, ProductColumn } from "../../Utils/TableColumn";
import "react-pro-sidebar/dist/css/styles.css";
import { ProductsContext } from "../../Global/ProductsContext";
import { HeaderProducts } from "../common/HeaderProducts";
import { db } from "../../Config/Config";

export const CatagoryView = () => {
  const [catagoryData, setcatagoryData] = useState([]);
 

  //get catagories from db
  useEffect(() => {
        db.collection("Catagories")
          .onSnapshot((snapshot) => {
            let prevCatagory=[]
          snapshot.forEach((doc)=>{
              prevCatagory.push({
             ID: doc.id,
             ...doc.data()
           })
         setcatagoryData([...prevCatagory]);
          })
        })

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
