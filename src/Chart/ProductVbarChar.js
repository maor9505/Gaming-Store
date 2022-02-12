import React, { useContext } from "react";
import Chart from "chart.js/auto";
import { BarElement } from "chart.js";
import { Bar } from "react-chartjs-2";
import { ProductsContext } from "../Global/ProductsContext";
import _ from "lodash";

Chart.register(BarElement);

export const ProductVbarChart = () => {
  const { products } = useContext(ProductsContext);

  // change productName to Correct Lable design
  const ProductNameToLableChart = () => {
    const nameArr = [];
    products.map((p) => {
      var name = p.ProductName;
      name = name.concat();
      name = name.split(" ");
      nameArr.push(name);
    });
    return nameArr;
  };

  var data = {
    labels: ProductNameToLableChart(),
    datasets: [
      {
        label: ` Product-Views`,
        data: products.map((p) => p.Views),
        backgroundColor: "rgba(54, 162, 235, 1)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
      },
      {
        label: `Product-Price`,
        data: products.map((p) => p.ProductPrice),
        backgroundColor: "rgb(255, 64, 0)",
        borderColor: "rgb(255, 64, 0)",
        borderWidth: 2,
      },

      {
        label: `Product-Sales`,
        data: products.map((p) => p.Sales),
        backgroundColor: "rgb(255, 255, 0)",
        borderColor: "rgb(255, 255, 0)",
        borderWidth: 2,
      },
    ],
  };
  var options = {
    responsive: true,
    scales: {
      y: {
        ticks: {
          color: "gray",
          beginAtZero: true,
        },
      },
      x: {
        ticks: {
          color: "gray",
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: (t) => {
            return t[0].label.replaceAll(",", " ");
          },
        },
      },
    },
  };
  return <Bar data={data} options={options} height={250} width={600} />;
};
