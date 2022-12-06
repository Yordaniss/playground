import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPostActions } from "../../store/index";

export default function Dropdown(props) {
  const touchedFieldsRedux = useSelector(
    ({ addPost }) => addPost.touchedFields
  );
  const dispatch = useDispatch();

  const setAsTouched = () => {
    const isAlreadyTouched = touchedFieldsRedux.some((field) => {
      if (props.selectionModifier === "ADD_POST") {
        return field === "main_category";
      }
    });
    if (!isAlreadyTouched) {
      dispatch(addPostActions.addTouchedField("main_category"));
    }
  };
  const className = props.className;
  const dropdownInputId = Math.ceil(Math.random() * 10000);
  const inputName = props.selectionModifier + Math.ceil(Math.random() * 10000);

  const [checkedState, setCheckedState] = useState(
    new Array(props.dropdownList.list.length).fill(false)
  );

  const handleChange = (position) => {
    let updatedCheckedState;
    // if (
    //   props.selectionModifier === "SORT" ||
    //   props.selectionModifier === "ADD_POST" ||
    // ) {
    updatedCheckedState = new Array(props.dropdownList.list.length).fill(false);
    updatedCheckedState[position] = true;
    // } else {
    //   updatedCheckedState = checkedState.map((item, index) =>
    //     index === position ? !item : item
    //   );
    // }

    setCheckedState(updatedCheckedState);
    props.onSelect(updatedCheckedState);
  };

  return (
    <div className={`dropdown ${className}`}>
      <input
        className="dropdown__input"
        type="checkbox"
        id={dropdownInputId}
        onChange={(e) => {
          setAsTouched();
        }}
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
      <label className="dropdown__top" htmlFor={dropdownInputId}>
        {props.dropdownList.title}
      </label>
      <div className="dropdown__options-container">
        <ul className="dropdown__options">
          {props.dropdownList.list.map((el, index) => {
            let inputType = "radio";
            // props.selectionModifier === "SORT" ||
            // props.selectionModifier === "ADD_POST"
            //   ? (inputType = "radio")
            //   : (inputType = "checkbox");
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
