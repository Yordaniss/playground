import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { addPostActions } from "../../store/index";

export default function Dropdown(props) {
  const dropdownTitleRef = useRef(null);
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
    if (!props.selectionModifier.includes("PROFILE")) {
      if (!isAlreadyTouched) {
        dispatch(addPostActions.addTouchedField("main_category"));
      }
    }
  };
  const className = props.className;
  const dropdownInputId = Math.ceil(Math.random() * 10000);
  const inputName = props.selectionModifier + Math.ceil(Math.random() * 10000);

  const [checkedState, setCheckedState] = useState(
    new Array(props.dropdownList.list.length).fill(false)
  );

  const handleChange = (position, optionTitle) => {
    let updatedCheckedState;
    updatedCheckedState = new Array(props.dropdownList.list.length).fill(false);
    updatedCheckedState[position] = true;
    dropdownTitleRef.current.innerText = optionTitle;
    setCheckedState(updatedCheckedState);
    props.onSelect(updatedCheckedState);
  };

  let dropdownTitle;
  if (!props.selectionModifier.includes("PROFILE")) {
    dropdownTitle = props.dropdownList.title;
  } else {
    dropdownTitle = <img src="../icons/profile.png"></img>;
  }

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
      <label
        ref={dropdownTitleRef}
        className="dropdown__top"
        htmlFor={dropdownInputId}
      >
        {dropdownTitle}
      </label>
      <div className="dropdown__options-container">
        <ul className="dropdown__options">
          {props.dropdownList.list.map((el, index) => {
            let inputType = "radio";
            const innerInputID = Math.ceil(Math.random() * 10000);
            return (
              <li key={index}>
                <input
                  id={innerInputID}
                  className="itemInput"
                  type={inputType}
                  name={inputName}
                  onChange={() => {
                    if (!props.selectionModifier.includes("PROFILE")) {
                      handleChange(index, el.optionTitle);
                    }
                  }}
                />
                <label htmlFor={innerInputID} className="itemLabel">
                  {!props.selectionModifier.includes("PROFILE") &&
                    el.optionTitle}
                  {props.selectionModifier === "PROFILE__NOT__LOGGED" && (
                    <Link href={el.href}>{el.optionTitle}</Link>
                  )}
                  {props.selectionModifier === "PROFILE__LOGGED" && (
                    <Link href={el.href} onClick={props.onSignOut}>
                      {el.optionTitle}
                    </Link>
                  )}
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
