import Dropdown from "../../UI/Dropdown";

export default function FilterDropdown(props) {
  return (
    <Dropdown
      className="dropdown"
      dropdownList={{
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
      }}
      selectionModifier={props.selectionModifier}
    ></Dropdown>
  );
}
