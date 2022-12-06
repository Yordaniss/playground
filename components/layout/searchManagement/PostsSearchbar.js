import Searchbar from "../../UI/Searchbar";
import { useSelector, useDispatch } from "react-redux";
import { searchConfigActions } from "../../../store/index";

export default function PostsSearchbar() {
  const dispatch = useDispatch();
  const searchConfig = useSelector(({ searchConfig }) => searchConfig);

  const setTitleFilter = (title) => {
    const filters = searchConfig.filtration;
    dispatch(searchConfigActions.setFilters({ ...filters, title: title }));
  };

  return <Searchbar onSearch={(title) => setTitleFilter(title)}></Searchbar>;
}
