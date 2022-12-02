import FilterDropdown from "./FilterDropdown";
import AgeInput from "./AgeInput";
import SortingDropdown from "./SortingDropdown";
import SearchBar from "../../UI/SearchBar";

export default function SearchManagement(props) {
  return (
    <div className="searchManagement">
      <FilterDropdown />
      <AgeInput />
      <SortingDropdown />
      <SearchBar />
    </div>
  );
}
