import React,{useContext,useState,} from "react";
import { ProductsContext } from "../Global/ProductsContext";
import { ProductColumn } from "./TableColumn";
import { TableBody } from "./TableBody";
import { TableHeader } from "./TableHeader";
import _ from "lodash";

export const Table = ({ Columns }) => {
  const { products } = useContext(ProductsContext);
  const [sortColumn, setsortColumn] = useState({ path: "title", order: "asc" });
  const [columns, setcolumns] = useState(Columns);
  const [productP, setproductP] = useState([...products]);

  const onSort = (newColumn) => {
    console.log("sort good");
    console.log(newColumn);
    setsortColumn(newColumn);
    setproductP(_.orderBy(productP, [sortColumn.path], [sortColumn.order]));
  };

  return (
    <div class='top'>
      {productP.length === 0 && (
        <div class="container d-flex justify-content-center bg-warning">
          No Orders To Display...Or your opttion search id not Correct
        </div>
      )}

      <table className="table">
        <TableHeader
          columns={columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody data={productP} columns={columns} />
      </table>
    </div>
  );
};

