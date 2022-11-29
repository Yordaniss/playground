import Dropdown from "../../UI/Dropdown";

export default function SortingDropdown(props) {
  return (
    <Dropdown
      className="dropdown"
      dropdownList={{
        key: Math.random(),
        title: "Sort by:",
        list: [
          "Age ascending",
          "Age descending",
          "Date ascending",
          "Date descending",
          "Alphabet ascending",
          "Alphabet descending",
        ],
      }}
      selectionModifier="SORT"
    ></Dropdown>
  );
}
