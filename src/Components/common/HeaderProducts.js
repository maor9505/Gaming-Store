import { hasData } from 'jquery';
import React, { useState, useContext,useEffect } from 'react'
import { db } from '../../Config/Config'


export const HeaderProducts = ({ data, setFilterProduct }) => {
  const [catagoryOption, setcatagoryOption] = useState([]);
  const [priceFilter, setpriceFilter] = useState();
  const [catagoryFilter, setCatagoryFilter] = useState("");
  const [catagoryAgeFilter, setCatagoryAgeFilter] = useState("");
  useEffect(() => {
    db.collection("Catagories").onSnapshot((snapshot) => {
      setcatagoryOption(
        snapshot.docs.map((doc) => ({ name: doc.data().Catagory_Name }))
      );
    });
  }, []);
  const hanldeChangeFilterOption = (type, value) => {
    let dataFilter = [];
    switch (type) {
      case "Catagory":
        setCatagoryFilter(value);
        if (value != "0") {
          dataFilter = data.filter((data) => data.Catagory == value);
          if (catagoryAgeFilter)
            dataFilter = data.filter(
              (data) => data.CatagoryAge == catagoryAgeFilter
            );
          if (priceFilter)
            dataFilter = hasData.filter(
              (data) => data.ProductPrice <= priceFilter
            );
        } else {
          setCatagoryFilter("");
          setCatagoryAgeFilter("");
          setpriceFilter("");
          dataFilter = [...data];
        }
        break;
      case "Age":
        if (value != "0") {
          setCatagoryAgeFilter(value);
          if (catagoryFilter) {
            dataFilter = data.filter((data) => data.Catagory == catagoryFilter);
            dataFilter = dataFilter.filter((data) => data.CatagoryAge == value);
            if (priceFilter)
              dataFilter = dataFilter.filter(
                (data) => data.ProductPrice <= priceFilter
              );
          } else {
            dataFilter = data.filter((data) => data.CatagoryAge == value);
            if (priceFilter)
              dataFilter = dataFilter.filter(
                (data) => data.ProductPrice <= priceFilter
              );
          }
        } else {
          if (catagoryFilter) {
            dataFilter = data.filter(
              (data) => data.Catagory == catagoryFilter
            );
            if (priceFilter)
              dataFilter = dataFilter.filter(
                (data) => data.ProductPrice <= priceFilter
              );
            setCatagoryAgeFilter("");
          } else {
            dataFilter = [...data];
            setCatagoryFilter("");
            setCatagoryAgeFilter("");
          }
        }
        break;
      case "Price":
        setpriceFilter(value);
        if (catagoryFilter) {
          dataFilter = data.filter((data) => data.Catagory == catagoryFilter);
          if (catagoryAgeFilter)
            dataFilter = dataFilter.filter(
              (data) => data.CatagoryAge == catagoryAgeFilter
            );
          if (value)
            dataFilter = dataFilter.filter(
              (data) => data.ProductPrice <= value
            );
        } else if (catagoryAgeFilter && !catagoryFilter) {
          dataFilter = data.filter(
            (data) => data.CatagoryAge == catagoryAgeFilter
          );
          if (value)
            dataFilter = dataFilter.filter(
              (data) => data.ProductPrice <= value
            );
        } else if (value && !catagoryAgeFilter && !catagoryFilter) {
          dataFilter = data.filter((data) => data.ProductPrice <= value);
        } else {
          dataFilter = [...data];
        }
        break;
      default:
        dataFilter = [...data];
    }
    setFilterProduct(dataFilter);
  };

  return (
    <div class="input-group input-group-lg mb-3 ">
      <select
        value={catagoryFilter}
        class="form-select"
        onChange={(e) => hanldeChangeFilterOption("Catagory", e.target.value)}
      >
        <option value="0">Choose Catagory (All)</option>
        {catagoryOption.map((ca) => (
          <option key={ca.name} value={ca.name}>
            {ca.name}
          </option>
        ))}
      </select>
      <select
        value={catagoryAgeFilter}
        class="form-select ms-4"
        onChange={(e) => hanldeChangeFilterOption("Age", e.target.value)}
      >
        <option value="0">Choose Catagory age</option>
        <option key={"1"} value="1">
          3-16
        </option>
        <option key={"2"} value="2">
          16-99
        </option>
      </select>
      <input
        value={priceFilter || ""}
        type="number"
        className="form-control ms-4"
        placeholder="Input Price:"
        onChange={(e) => hanldeChangeFilterOption("Price", e.target.value)}
      />
    </div>
  );
};
