import FilterDropdown from "./filterDropdown/FilterDropdown";
import AgeInput from "./ageInput/AgeInput";
import SortingDropdown from "./sorting/SortingDropdown";
import SearchBar from "./searchBar/SearchBar";

export default function SearchManagement() {
  return (
    <div className="searchManagement">
      <FilterDropdown />
      <AgeInput />
      <SortingDropdown />
      <SearchBar />
    </div>
  );
}
