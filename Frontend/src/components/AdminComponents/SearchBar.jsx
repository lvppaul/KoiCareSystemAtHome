import React from "react";
import { FaSearch } from "react-icons/fa";
import "./style/SearchBar.css";
const SearchBar = () => {
  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input id="search-input" placeholder="Type to search..." />
    </div>
  );
};
export default SearchBar;
