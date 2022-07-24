import React, { useState, useEffect } from "react";
import { db } from "../../Config/Config";
import _ from "lodash";

export const HeaderProducts = React.memo(({ data, setFilterProduct }) => {
  const [catagoryOption, setcatagoryOption] = useState([]);
  const [priceFilter, setpriceFilter] = useState(0);
  const [catagoryFilter, setCatagoryFilter] = useState("");
  const [catagoryAgeFilter, setCatagoryAgeFilter] = useState("");
  const [checkInput, setcheckInput] = useState("");

  useEffect(async () => {
    const catagories = await db.collection("Catagories").get();
    setcatagoryOption(
      catagories.docs.map((doc) => ({ name: doc.data().Catagory_Name }))
    );
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
    if (checkInput == "Views")
      DataFilter = _.orderBy(DataFilter, ["Views"], ["desc"]);
    if (checkInput == "Sales")
      DataFilter = _.orderBy(DataFilter, ["Sales"], ["desc"]);
    setFilterProduct([...DataFilter]);
  }, [data,catagoryFilter, catagoryAgeFilter, priceFilter, checkInput]);

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
      case "checkInput":
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
        <div className="form-check m-2">
          <input
            className="form-check-input"
            type="checkbox"
            value="Views"
            checked={checkInput == "Views"}
            onChange={(e) =>
              hanldeChangeFilterOption("checkInput", e.target.value)
            }
          />
          <label className="form-check-label">By Views</label>
        </div>
        <div className="form-check m-2">
          <input
            className="form-check-input"
            type="checkbox"
            value="Sales"
            checked={checkInput == "Sales"}
            onChange={(e) =>
              hanldeChangeFilterOption("checkInput", e.target.value)
            }
          />
          <label className="form-check-label">By Sales</label>
        </div>
        <div className="form-check m-2">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            checked={checkInput == ""}
            onChange={(e) =>
              hanldeChangeFilterOption("checkInput", e.target.value)
            }
          />
          <label className="form-check-label">Non</label>
        </div>
      </div>
    </>
  );
});
