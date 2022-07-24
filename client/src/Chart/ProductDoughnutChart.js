import React, { useContext } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { ProductsContext } from "../Global/ProductsContext";

ChartJS.register(ArcElement, Tooltip, Legend);
export function ProductDoughnutChart() {
  const { products } = useContext(ProductsContext);

  // get Random color for item chart
  const getRandomColor=() =>{

    var letters = "0123456789ABCDEF".split("");
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const data = {
    labels: products.map((p) => p.ProductName),
    datasets: [
      {
        label: "Product Sale" + products.map((p) => p.ProductName),
        data: products.map((p) => p.Sales),
        backgroundColor: () => getRandomColor(),
        //   borderColor:,
        borderWidth: 1,
      },
    ],
  };
  var options = {
    responsive: true,
    borderColor: "white",
    radius: 100,
    cutout: 40,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Product-Sales:",
      },
    },
  };
  return <Doughnut data={data} options={options} />;
}
