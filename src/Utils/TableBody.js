import React from "react";
import _ from "lodash";
export const TableBody = ({ data, columns }) => {
    console.table(data);
   const renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  return (
    <tbody>
      {data.map((item) => (
        <tr key={item.ProductID}>
          {columns.map((col) => (
            <td key={item.ProductID + (col.path || col.key)}>
              {renderCell(item, col)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

  