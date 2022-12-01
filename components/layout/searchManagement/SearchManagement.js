import FilterDropdown from "./FilterDropdown";
import AgeInput from "./AgeInput";
import SortingDropdown from "./SortingDropdown";
import SearchBar from "../../UI/SearchBar";
import { useState } from "react";

export default function SearchManagement(props) {
  const onSelect = (orderingProps, selectionModifier) => {
    props.onSelect(orderingProps, selectionModifier);
  };
  return (
    <div className="searchManagement">
      <FilterDropdown
        selectionModifier="FILTER"
        onSelect={(orderingProps, selectionModifier) => {
          onSelect(orderingProps, selectionModifier);
        }}
      />
      <AgeInput />
      <SortingDropdown
        selectionModifier="SORT"
        onSelect={(orderingProps, selectionModifier) => {
          onSelect(orderingProps, selectionModifier);
        }}
      />
      <SearchBar />
    </div>
  );
}
