import { useState } from "react";

export default function Dropdown(props) {
  const className = props.className;
  const dropdownInputId = Math.ceil(Math.random() * 10000);
  const inputName = props.selectionModifier + Math.ceil(Math.random() * 10000);

  const [checkedState, setCheckedState] = useState(
    new Array(props.dropdownList.list.length).fill(false)
  );

  const handleChange = (position) => {
    let updatedCheckedState;
    if (props.selectionModifier === "FILTER") {
      updatedCheckedState = checkedState.map((item, index) =>
        index === position ? !item : item
      );
    } else {
      updatedCheckedState = new Array(props.dropdownList.list.length).fill(
        false
      );
      updatedCheckedState[position] = true;
    }

    setCheckedState(updatedCheckedState);
    props.onSelect(updatedCheckedState);
  };

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
          {props.dropdownList.list.map((el, index) => {
            let inputType;
            props.selectionModifier === "SORT" ||
            props.selectionModifier === "POST"
              ? (inputType = "radio")
              : (inputType = "checkbox");
            const innerInputID = Math.ceil(Math.random() * 10000);
            return (
              <li key={index}>
                <input
                  id={innerInputID}
                  className="itemInput"
                  type={inputType}
                  name={inputName}
                  onChange={() => {
                    handleChange(index);
                  }}
                />

                <label htmlFor={innerInputID} className="itemLabel">
                  {el.optionTitle}
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
