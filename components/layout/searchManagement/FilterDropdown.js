import Dropdown from "../../UI/Dropdown";

export default function FilterDropdown() {
  return (
    <Dropdown
      className="dropdown"
      dropdownList={{
        key: Math.random(),
        title: "Choose category:",
        list: ["Cooking", "Games", "Sport", "Arts & Crafts"],
      }}
      selectionModifier="FILTER"
    ></Dropdown>
  );
}
