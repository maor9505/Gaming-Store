import React, { useContext, useState, useEffect,useMemo } from "react";
import { ProductsContext } from "../Global/ProductsContext";
import { TableBody } from "./TableBody";
import { TableHeader } from "./TableHeader";
import _ from "lodash";
import { paginate } from "../Components/common/paginat";
import { Pagination } from "../Components/common/Pagiantion";

export const Table = ({ data, Columns }) => {
  const [arrayData, setarrayData] = useState([]);
  const [sortColumn, setsortColumn] = useState({ path: "title", order: "asc" });
  const [columns, setcolumns] = useState([]);
  const [pageSize, setpageSize] = useState(8);
  const [currentPage, setcurrentPage] = useState(1);
  const ordersP = paginate(arrayData, currentPage, pageSize);
  
  useEffect(() => {
    setarrayData([...data]);
    setcolumns(Columns);
  }, [data]);
  
  // sort date by column name 
  const onSort = (newColumn) => {
    setsortColumn(newColumn);
    const sortarray = _.orderBy(data, [sortColumn.path], [sortColumn.order]);
    setarrayData(sortarray);
    console.log("aa");
    console.log(arrayData);
  };
  // function the handle the page change
  const handlePagechange = (page) => {
    setcurrentPage(page);
  };
  return (
    <div className="container">
      {arrayData.length === 0 && (
        <div className="d-flex justify-content-center bg-warning">
          No Orders To Display...
        </div>
      )}
      <div className="table-responsive">
        <table className="table table-hover table-bordered">
          <TableHeader
            columns={columns}
            sortColumn={sortColumn}
            onSort={onSort}
          />
          <TableBody data={ordersP} columns={columns} />
        </table>
      </div>
      <div className="d-flex justify-content-center mt-4">
        <Pagination
          itemsCount={data.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePagechange}
        />
      </div>
    </div>
  );
};
