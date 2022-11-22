import { useState } from "react";

export default function Dropdown(props) {
  let dropdownInputId =
    props.className + "InputId" + Math.ceil(Math.random() * 10000);

  let className = props.className;

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
            if (typeof el === "object") {
              console.log(el.selectionModifier);
              return (
                <li key={Math.random()}>
                  <Dropdown
                    key={Math.random()}
                    className="innerDropdown"
                    dropdownList={{
                      title: el.title,
                      list: el.list,
                    }}
                    selectionModifier={el.selectionModifier}
                  ></Dropdown>
                </li>
              );
            } else {
              let innerInputID = Math.ceil(Math.random() * 10000);

              let inputType;
              props.selectionModifier === "SORT"
                ? (inputType = "radio")
                : (inputType = "checkbox");
              console.log(props.dropdownList.title);
              return (
                <li key={Math.random()}>
                  <input
                    id={`innerInputID${innerInputID}`}
                    className="itemInput"
                    type={inputType}
                    name={props.dropdownList.title}
                  />
                  <label
                    htmlFor={`innerInputID${innerInputID}`}
                    className="itemLabel"
                  >
                    {el}
                  </label>
                </li>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
}
