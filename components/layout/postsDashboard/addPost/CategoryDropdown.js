import Dropdown from "../../../UI/Dropdown";
import { useSelector, useDispatch } from "react-redux";
import { addPostActions } from "../../../../store/index";

export default function CategoryDropdown() {
  const dispatch = useDispatch();
  const categoryState = useSelector(({ addPost }) => addPost.category);

  const changeCategory = (value) => {
    dispatch(
      addPostActions.changeCategory({
        value: value.option.value,
      })
    );
  };
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

  return (
    <Dropdown
      //add has error
      className={`dropdown`}
      dropdownList={dropdownList}
      selectionModifier="POST"
      onSelect={(e) => {
        changeCategory(JSON.parse(e.currentTarget.value));
      }}
    ></Dropdown>
  );
}
