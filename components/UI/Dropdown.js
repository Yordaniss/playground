import { useSelector, useDispatch } from "react-redux";

export default function Dropdown(props) {
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
                  name={props.dropdownList.titles}
                  onChange={() => {
                    props.onSelect(el);
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
