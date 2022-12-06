import FilterDropdown from "./FilterDropdown";
import AgeInput from "./AgeInput";
import SortingDropdown from "./SortingDropdown";
import PostsSearchbar from "./PostsSearchBar";

export default function SearchManagement(props) {
  return (
    <div className="searchManagement">
      <FilterDropdown />
      <AgeInput />
      <SortingDropdown />
      <PostsSearchbar />
    </div>
  );
}
