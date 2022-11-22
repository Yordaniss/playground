import Dropdown from "../../UI/Dropdown";

export default function FilterDropdown() {
  return (
    <Dropdown
      className="dropdown"
      dropdownList={{
        title: "Choose category:",
        list: [
          {
            title: "Indoor",
            list: ["Cooking", "Crafting", "Games"],
            selectionModifier: "FILTER",
          },
          "Outdoor",
        ],
      }}
      selectionModifier="FILTER"
    ></Dropdown>
  );
}
