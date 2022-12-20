import Dropdown from "../../../UI/Dropdown";
import { useDispatch } from "react-redux";
import { addPostActions } from "../../../../store/index";
import { main_categories } from "../../searchManagement/SearchConstants";

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

export default function CategoryDropdown(props) {
  const dispatch = useDispatch();
  const categoriesChangeHanlder = (checkedItems) => {
    const list = dropdownList.list;
    const categories = checkedItems
      .map((state, index) => {
        if (state) {
          return list[index];
        }
      })
      .filter(Boolean);
    dispatch(addPostActions.setCategory(categories[0].filterBy.value));
  };

  return (
    <Dropdown
      className={`${props.className && props.className}`}
      dropdownList={dropdownList}
      selectionModifier="ADD_POST"
      onSelect={(checkedItems) => {
        categoriesChangeHanlder(checkedItems);
      }}
    ></Dropdown>
  );
}
