import { useSelector, useDispatch } from "react-redux";
import { searchConfigActions } from "../../store/index";

export default function Dropdown(props) {
  const dispatch = useDispatch();
  const sortingState = useSelector(({ searchConfig }) => searchConfig.sorting);
  const filtrationState = useSelector(
    ({ searchConfig }) => searchConfig.filtration
  );

  const changeSorting = (propertyName, direction) => {
    dispatch(
      searchConfigActions.changeSorting({
        property: propertyName,
        direction: direction,
      })
    );
  };
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

  const className = props.className;
  const dropdownInputId = Math.ceil(Math.random() * 10000);
  return (
    <div className={className}>
      <input
        className={className + "__input"}
        type="checkbox"
        id={dropdownInputId}
      ></input>
      <svg className="svgFilter">
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
            result="goo"
          />
          <feComposite in="goo" result="composite" operator="atop" />
          <feBlend in="SourceGraphic" in2="composite" />
        </filter>
      </svg>
      <label className={className + "__top"} htmlFor={dropdownInputId}>
        {props.dropdownList.title}
      </label>
      <div className={className + "__options-container"}>
        <ul className={className + "__options"}>
          {props.dropdownList.list.map((el) => {
            const innerInputID = Math.ceil(Math.random() * 10000);

            let inputType;
            props.selectionModifier === "SORT"
              ? (inputType = "radio")
              : (inputType = "checkbox");
            return (
              <li key={Math.random()}>
                <input
                  id={innerInputID}
                  className="itemInput"
                  type={inputType}
                  name={props.dropdownList.title}
                  onChange={() => {
                    if (props.selectionModifier === "SORT") {
                      changeSorting(el.sortBy.property, el.sortBy.direction);
                    } else if (props.selectionModifier === "FILTER") {
                      if (
                        !filtrationState.filters.some(
                          (filter) =>
                            filter.property === el.filterBy.property &&
                            filter.value === el.filterBy.value
                        )
                      ) {
                        addFilter(el.filterBy.property, el.filterBy.value);
                      } else {
                        removeFilter(el.filterBy.property, el.filterBy.value);
                      }
                    }
                  }}
                />

                <label htmlFor={innerInputID} className="itemLabel">
                  {el.optionTitle}
                  {/* {console.log(filtrationState)} */}
                </label>
              </li>
            );
          })}
          {console.log(filtrationState)}
        </ul>
      </div>
    </div>
  );
}
