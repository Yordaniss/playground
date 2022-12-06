import FilterDropdown from "./FilterDropdown";
import AgeInput from "./AgeInput";
import SortingDropdown from "./SortingDropdown";
import PostsSearchbar from "./PostsSearchbar";

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
