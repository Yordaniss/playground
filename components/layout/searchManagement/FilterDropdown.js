import Dropdown from "../../UI/Dropdown";
import { useDispatch } from "react-redux";
import { searchConfigActions } from "../../../store/index";

const dropdownList = {
  key: Math.random(),
  title: "Choose category:",
  list: [
    {
      optionTitle: "Arts & Crafts",
      filterBy: {
        property: "main_category",
        value: 0,
      },
    },
    {
      optionTitle: "Cooking",
      filterBy: {
        property: "main_category",
        value: 1,
      },
    },
    {
      optionTitle: "Foraging",
      filterBy: {
        property: "main_category",
        value: 2,
      },
    },
    {
      optionTitle: "Games",
      filterBy: {
        property: "main_category",
        value: 3,
      },
    },
    {
      optionTitle: "Sport",
      filterBy: {
        property: "main_category",
        value: 4,
      },
    },
  ],
};

export default function FilterDropdown() {
  const dispatch = useDispatch();

  const filtrationHandler = (checkedItems) => {
    const list = dropdownList.list;
    const filters = checkedItems
      .map((state, index) => {
        if (state) {
          return list[index];
        }
      })
      .filter(Boolean);

    dispatch(searchConfigActions.setFilters(filters));
  };

  return (
    <Dropdown
      className="dropdown"
      dropdownList={dropdownList}
      selectionModifier="FILTER"
      onSelect={(checkedItems) => {
        filtrationHandler(checkedItems);
      }}
    ></Dropdown>
  );
}
