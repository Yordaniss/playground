import { useState } from "react";

export default function Dropdown(props) {
  const [isCheckAllowed, setIfCheckAllowed] = useState(true);

  let dropdownInputId =
    props.className + "InputId" + Math.ceil(Math.random() * 10000);

  let className = props.className;

  const confirmCheck = () => {
    if (props.selectionModifier === "SORT") {
      setAllowChecking(false);
    }
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
          {props.dropdownList.list.map((el) => {
            if (typeof el === "object") {
              return (
                <li key={Math.random()}>
                  <Dropdown
                    key={Math.random()}
                    className="innerDropdown"
                    dropdownList={{
                      title: el.title,
                      list: el.list,
                    }}
                  ></Dropdown>
                </li>
              );
            } else {
              let checkboxId = Math.ceil(Math.random() * 10000);

              return (
                <li key={Math.random()}>
                  <input
                    id={`checkboxId${checkboxId}`}
                    className="itemCheckbox"
                    type="checkbox"
                    onChange={(e) => {
                      isCheckAllowed
                        ? (e.target.checked = true)
                        : (e.target.checked = false);
                      props.selectionModifier === "SORT" && confirmCheck;
                    }}
                  />
                  <label
                    htmlFor={`checkboxId${checkboxId}`}
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
