import React, { useContext, useEffect } from "react";
import Chart from "chart.js/auto";
import { BarElement } from "chart.js";
import { Line } from "react-chartjs-2";
import { AdminOrderContext } from "../Global/AdminOrdersContext";
import _ from "lodash";
import { useState } from "react";
Chart.register(BarElement);

export const OrderMonthBarChar = () => {
  const { AllOrderUsers } = useContext(AdminOrderContext);
  const [dataChart, setdataChart] = useState([]);

  useEffect(() => {
    setdataChart(sumOrderbyMonth());
  }, [AllOrderUsers]);

  var data = {
    labels: dataChart.map((d) => d.lable),
    datasets: [
      {
        label: `Products-Sales By Month`,
        data: dataChart.map((d) => d.totalPrice),
        backgroundColor: "rgba(54, 162, 235, 1)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
        tension: 0.4,
        fill: false,
        pointBorderColor: "black",
      },
    ],
  };

  const sumOrderbyMonth = () => {
    var data = _.reduce(
      AllOrderUsers,
      function (result, obj) {
        var d = new Date(obj.DateCreate);
        var k = d.toLocaleString("en-GB").slice(3, 10);
        (result[k] || (result[k] = [])).push(obj.TotalPrice);
        return result;
      },
      {}
    );
    var t = [];
    for (let k in data) {
      t.push({
        lable: k,
        month: k.slice(0,2),
        year: k.slice(3,8),
        totalPrice: _.sum(data[k]),
      });
    }
    t = _.orderBy(t, ["year", "month"], ["asc", "asc"]);

    return t;
  };
  var options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "black",
          padding: 10,
        },
      },
      x: {
        ticks: {
          color: "black",
          padding: 5,
        },
      },
    },
  };
  return <Line data={data} options={options} height={200} width={400} />;
};
