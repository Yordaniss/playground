import Dropdown from "../../UI/Dropdown";

export default function SortingDropdown(props) {
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
      selectionModifier={props.selectionModifier}
    ></Dropdown>
  );
}
