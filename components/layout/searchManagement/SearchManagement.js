import FilterDropdown from "./FilterDropdown";
import AgeInput from "./AgeInput";
import SortingDropdown from "./SortingDropdown";
import PostsSearchBar from "./PostsSearchBar";

export default function SearchManagement() {
  return (
    <div className="searchManagement">
      <FilterDropdown />
      <AgeInput />
      <SortingDropdown />
      <PostsSearchBar />
    </div>
  );
}
