import Dropdown from "../../UI/Dropdown";
import { useDispatch } from "react-redux";
import { searchConfigActions } from "../../../store/index";

const dropdownList = {
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
};

export default function SortingDropdown() {
  const dispatch = useDispatch();

  const sortingHandler = (checkedItems) => {
    const list = dropdownList.list;
    const checkedItem = checkedItems
      .map((state, index) => {
        if (state) {
          return list[index];
        }
      })
      .filter(Boolean);
    dispatch(searchConfigActions.setSorting(...checkedItem));
  };

  return (
    <Dropdown
      className="dropdown"
      dropdownList={dropdownList}
      selectionModifier="SORT"
      onSelect={(checkedItems) => {
        sortingHandler(checkedItems);
      }}
    ></Dropdown>
  );
}
