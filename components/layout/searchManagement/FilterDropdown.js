import Dropdown from "../../UI/Dropdown";

export default function FilterDropdown() {
  return (
    <Dropdown
      className="dropdown"
      dropdownList={{
        title: "Choose category:",
        list: [
          // "Indoor",
          {
            title: "Indoor",
            list: ["Cooking", "Crafting", "Games"],
          },
          "Outdoor",
        ],
      }}
    ></Dropdown>
  );
}
