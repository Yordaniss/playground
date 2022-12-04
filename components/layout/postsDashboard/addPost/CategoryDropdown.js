import Dropdown from "../../../UI/Dropdown";
import { useDispatch } from "react-redux";
import { addPostActions } from "../../../../store/index";

const dropdownList = {
  key: Math.random(),
  title: "Choose category:",
  list: [
    {
      optionTitle: "Arts & Crafts",
      option: {
        property: "main_category",
        value: 0,
      },
    },
    {
      optionTitle: "Cooking",
      option: {
        property: "main_category",
        value: 1,
      },
    },
    {
      optionTitle: "Foraging",
      option: {
        property: "main_category",
        value: 2,
      },
    },
    {
      optionTitle: "Games",
      option: {
        property: "main_category",
        value: 3,
      },
    },
    {
      optionTitle: "Sport",
      option: {
        property: "main_category",
        value: 4,
      },
    },
  ],
};

export default function CategoryDropdown() {
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
    dispatch(addPostActions.setCategory(categories[0].option.value));
  };

  return (
    <Dropdown
      className={`dropdown`}
      dropdownList={dropdownList}
      selectionModifier="ADD_POST"
      onSelect={(checkedItems) => {
        categoriesChangeHanlder(checkedItems);
      }}
    ></Dropdown>
  );
}
