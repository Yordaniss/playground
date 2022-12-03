import Dropdown from "../../UI/Dropdown";
import { useSelector, useDispatch } from "react-redux";
import { searchConfigActions } from "../../../store/index";

export default function FilterDropdown() {
  const dispatch = useDispatch();
  const filtrationState = useSelector(
    ({ searchConfig }) => searchConfig.filtration
  );

  const addFilter = (propertyName, value) => {
    dispatch(
      searchConfigActions.addFilter({
        property: propertyName,
        value: value,
      })
    );
  };
  const removeFilter = (propertyName, value) => {
    const filters = filtrationState.filters;
    const filtered = filters.filter(
      (filterOPtion) =>
        filterOPtion.property !== propertyName || filterOPtion.value !== value
    );
    dispatch(searchConfigActions.removeFilter(filtered));
  };

  const filtrationHandler = (el, e) => {
    console.log({ ...el.filterBy } + " " + e.currentTarget.checked);
    if (e.currentTarget.checked) {
      if (
        !filtrationState.filters.some(
          (filter) =>
            filter.property === el.filterBy.property &&
            filter.value === el.filterBy.value
        )
      ) {
        addFilter(el.filterBy.property, el.filterBy.value);
      }
    } else {
      removeFilter(el.filterBy.property, el.filterBy.value);
    }
  };

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
      selectionModifier="FILTER"
      onSelect={(e) => {
        const el = JSON.parse(e.currentTarget.value);
        filtrationHandler(el, e);
      }}
    >
      {console.log(filtrationState)}
    </Dropdown>
  );
}
