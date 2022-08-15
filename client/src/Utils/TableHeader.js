import React from "react";

export const TableHeader = ({ columns, sortColumn, onSort }) => {
  const raiseSort = (path) => {
    var newColumn = { ...sortColumn };
    if (newColumn.path === path) {
      newColumn.order === "asc"
        ? (newColumn.order = "desc")
        : (newColumn.order = "asc");
    } else {
      newColumn.path = path;
      newColumn.order = "asc";
    }
    onSort(newColumn);
  };
console.log('columns')
console.log(columns)
  return (
    <thead className="">
      <tr>
        {columns.map((col) => (
          <th key={col.path+col.label} onClick={() => raiseSort(col.path)}>
            {col.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

