import React, { useState, useContext, useEffect } from "react";
import { db } from "../../Config/Config";
import _ from "lodash";

export const HeaderProducts = ({ data, setFilterProduct }) => {
  const [catagoryOption, setcatagoryOption] = useState([]);
  const [priceFilter, setpriceFilter] = useState(0);
  const [catagoryFilter, setCatagoryFilter] = useState("");
  const [catagoryAgeFilter, setCatagoryAgeFilter] = useState("");
  const [checkInput, setcheckInput] = useState("");

  useEffect(() => {
    db.collection("Catagories").onSnapshot((snapshot) => {
      setcatagoryOption(
        snapshot.docs.map((doc) => ({ name: doc.data().Catagory_Name }))
      );
    });
  }, []);

  useEffect(() => {
    var DataFilter = _.filter(
      data,
      (obj) =>
        (catagoryFilter != ""
          ? obj.Catagory == catagoryFilter
          : obj.Catagory != catagoryFilter) &&
        (catagoryAgeFilter != ""
          ? obj.CatagoryAge == catagoryAgeFilter
          : obj.CatagoryAge != catagoryAgeFilter) &&
        (priceFilter != 0
          ? obj.ProductPrice <= priceFilter
          : obj.ProductPrice >= 0)
    );
if(checkInput=='Views')
DataFilter=_.orderBy(DataFilter,['Views'],['desc']);
if (checkInput == "Sales") 
DataFilter = _.orderBy(DataFilter, ["Sales"], ["desc"]);
    setFilterProduct([...DataFilter]);
  }, [data,catagoryFilter, catagoryAgeFilter, priceFilter,checkInput]);

  const hanldeChangeFilterOption = (type, value) => {
    switch (type) {
      case "Catagory":
        setCatagoryFilter(value);
        break;
      case "Age":
        setCatagoryAgeFilter(value);
        break;
      case "Price":
        setpriceFilter(value);
        break;
      case "Views":
        setcheckInput(value);
        break;
      case "Sales":
        setcheckInput(value);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="input-group input-group-lg mt-4 ">
        <select
          value={catagoryFilter}
          className="form-select"
          onChange={(e) => hanldeChangeFilterOption("Catagory", e.target.value)}
        >
          <option value="">Choose Catagory (All)</option>
          {catagoryOption.map((ca) => (
            <option key={ca.name} value={ca.name}>
              {ca.name}
            </option>
          ))}
        </select>
        <select
          value={catagoryAgeFilter}
          className="form-select ms-4"
          onChange={(e) => hanldeChangeFilterOption("Age", e.target.value)}
        >
          <option value="">Choose Catagory age</option>
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
      <div className="d-flex justify-content-center">
        <div class="form-check m-2">
          <input
            class="form-check-input"
            type="checkbox"
            id="flexCheckDefault"
            value="Views"
            checked={checkInput == "Views"}
            onChange={(e) => hanldeChangeFilterOption("Views", e.target.value)}
          />
          <label class="form-check-label" for="flexCheckDefault">
            By Views
          </label>
        </div>
        <div class="form-check m-2">
          <input
            class="form-check-input"
            type="checkbox"
            id="flexCheckDefault1"
            value="Sales"
            checked={checkInput == "Sales"}
            onChange={(e) => hanldeChangeFilterOption("Sales", e.target.value)}
          />
          <label class="form-check-label" for="flexCheckDefault1">
            By Sales
          </label>
        </div>
        <div class="form-check m-2">
          <input
            class="form-check-input"
            type="checkbox"
            id="flexCheckDefault2"
            value=""
            checked={checkInput == ""}
            onChange={(e) => hanldeChangeFilterOption("Sales", e.target.value)}
          />
          <label class="form-check-label" for="flexCheckDefault2">
            Non
          </label>
        </div>
      </div>
    </>
  );
};
