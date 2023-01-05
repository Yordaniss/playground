import Dropdown from "../../UI/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { searchConfigActions } from "../../../store/index";
import { main_categories } from "./SearchConstants";

const dropdownList = {
  key: Math.random(),
  title: "Choose category:",
  list: [
    {
      optionTitle: main_categories.ARTS_AND_CRAFTS.title,
      filterBy: {
        property: "main_category",
        value: main_categories.ARTS_AND_CRAFTS.value,
      },
    },
    {
      optionTitle: main_categories.COOKING.title,
      filterBy: {
        property: "main_category",
        value: main_categories.COOKING.value,
      },
    },
    {
      optionTitle: main_categories.FORAGING.title,
      filterBy: {
        property: "main_category",
        value: main_categories.FORAGING.value,
      },
    },
    {
      optionTitle: main_categories.GAMES.title,
      filterBy: {
        property: "main_category",
        value: main_categories.GAMES.value,
      },
    },
    {
      optionTitle: main_categories.SPORT.title,
      filterBy: {
        property: "main_category",
        value: main_categories.SPORT.value,
      },
    },
  ],
};

export default function FilterDropdown() {
  const dispatch = useDispatch();
  const searchConfig = useSelector(({ searchConfig }) => searchConfig);

  const filtrationHandler = (checkedItems) => {
    const list = dropdownList.list;
    const checkedItem = checkedItems
      .map((state, index) => {
        if (state) {
          return list[index];
        }
      })
      .filter(Boolean);
    let filters = { ...searchConfig.filtration };
    if (checkedItem[0].filterBy.property === "main_category") {
      filters = {
        ...searchConfig.filtration,
        main_category: checkedItem[0].filterBy.value,
      };
    }

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
