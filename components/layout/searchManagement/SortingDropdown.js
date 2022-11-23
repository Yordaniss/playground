import Dropdown from "../../UI/Dropdown";

export default function SortingDropdown() {
  return (
    <Dropdown
      className="dropdown"
      dropdownList={{
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
