import React, { useContext, useState, useEffect } from "react";
import { ProductsContext } from "../Global/ProductsContext";
import { TableBody } from "./TableBody";
import { TableHeader } from "./TableHeader";
import _ from "lodash";

export const Table = ({ data, Columns }) => {
  const [arrayData, setarrayData] = useState([]);
  const [sortColumn, setsortColumn] = useState({ path: "title", order: "asc" });
  const [columns, setcolumns] = useState(Columns);
  useEffect(() => {
    setarrayData(data);
  }, [data]);

  const onSort = (newColumn) => {
    console.log("sort good");
    console.log(newColumn);
    setsortColumn(newColumn);
    setarrayData(_.orderBy(arrayData, [sortColumn.path], [sortColumn.order]));
  };
  return (
    <div class="top">
      {arrayData.length === 0 && (
        <div class="container d-flex justify-content-center bg-warning">
          No Orders To Display...
        </div>
      )}

      <table className="table table-hover table-bordered">
        <TableHeader
          columns={columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody data={arrayData} columns={columns} />
      </table>
    </div>
  );
};
