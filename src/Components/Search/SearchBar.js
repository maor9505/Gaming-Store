import React, { useState } from "react";
import "./SearchBar.css";
import { Link} from 'react-router-dom';
// Search bar in navbar to search products by name
export const SearchBar = ({ placeholder, data }) => {
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const newFilter = data.filter((value) => {
            return value.ProductName.toLowerCase().includes(searchWord.toLowerCase());
        });
        if (searchWord === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
    };

    const clearInput = () => {
        setFilteredData([]);
        setWordEntered("");
    };

    return (
      <div className="search">
        <div className="searchInputs">
          <input
            type="text"
            className="border border-success rounded-pill "
            placeholder={placeholder}
            value={wordEntered}
            onChange={handleFilter}
          />

           <div className="searchIcon"> 
           {filteredData.length === 0 ? (
              <i className=" bg-light fa fa-search fa-2x"></i>
            ) : (
              <i onClick={clearInput} className=" bg-light fa fa-times-circle fa-2x"></i>
            )} 
           </div>
          {filteredData.length !== 0 && (
            <div className="dataResult ">
              {filteredData.slice(0, 15).map((value) => {
                return (
                  <Link
                    className=" dataItem nav-link text-dark"
                    to={`/products/${value.ID}`}
                    key={value.ID}
                  >
                    {value.ProductName}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
}

