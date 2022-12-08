import SearchBar from "../../UI/SearchBar";
import { useSelector, useDispatch } from "react-redux";
import { searchConfigActions } from "../../../store/index";

export default function PostsSearchBar() {
  const dispatch = useDispatch();
  const searchConfig = useSelector(({ searchConfig }) => searchConfig);

  const setTitleFilter = (title) => {
    const filters = searchConfig.filtration;
    dispatch(searchConfigActions.setFilters({ ...filters, title: title }));
  };

  return <SearchBar onSearch={(title) => setTitleFilter(title)}></SearchBar>;
}
