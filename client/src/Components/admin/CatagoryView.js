import React, { useEffect, useState} from "react";
import { Table } from "../../Utils/Table";
import { CatagoryColumn } from "../../Utils/TableColumn";
import "react-pro-sidebar/dist/css/styles.css";
import { db } from "../../Config/Config";
import axios from "axios";
import { ToastAlert } from "../../Utils/Toast";

export const CatagoryView = () => {
  const [categoryData, setCategoryData] = useState([]);
 

  //get catagories from db
  useEffect(async() => {
   const res =  await axios.get("/category/getCategories");
   console.log('categories')
   console.log(res.data.categories);
    setCategoryData(res.data.categories);

  }, []);

const DeleteCatagory = async (category) => {
  try {
    const res = await axios.post("/category/deleteCategory", {
      categoryID: category.ID,
    });
     const newCategories = [...categoryData];
     let tempCategories = newCategories.filter((cat) => cat.ID !== category.ID);
     setCategoryData(tempCategories);
     ToastAlert("category delete");
  } catch (err) {
    console.log(err);
  }
};
   

  return (
    <div className="container ">
      <h3>
        <span className="badge bg-light text-success">Categories</span>
      </h3>
      <div className="">
        <Table
          data={categoryData}
          Columns={CatagoryColumn({ DeleteCatagory: DeleteCatagory })}
        ></Table>
      </div>
    </div>
  );
};
