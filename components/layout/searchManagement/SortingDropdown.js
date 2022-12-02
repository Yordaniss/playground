import Dropdown from "../../UI/Dropdown";
import { useSelector, useDispatch } from "react-redux";
import { searchConfigActions } from "../../../store/index";

export default function SortingDropdown(props) {
  const dispatch = useDispatch();
  const sortingState = useSelector(({ searchConfig }) => searchConfig.sorting);

  const changeSorting = (propertyName, direction) => {
    dispatch(
      searchConfigActions.changeSorting({
        property: propertyName,
        direction: direction,
      })
    );
  };

  return (
    <Dropdown
      className="dropdown"
      dropdownList={{
        key: Math.random(),
        title: "Sort by:",
        list: [
          {
            optionTitle: "Age ascending",
            sortBy: {
              property: "age_category",
              direction: "asc",
            },
          },
          {
            optionTitle: "Age descending",
            sortBy: {
              property: "age_category",
              direction: "desc",
            },
          },
          {
            optionTitle: "Alphabet ascending",
            sortBy: {
              property: "title",
              direction: "asc",
            },
          },
          {
            optionTitle: "Alphabet descending",
            sortBy: {
              property: "title",
              direction: "desc",
            },
          },
        ],
      }}
      selectionModifier="SORT"
      onSelect={(el) => changeSorting(el.sortBy.property, el.sortBy.direction)}
    ></Dropdown>
  );
}
