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
            // if (typeof el === "object") {
            //   return (
            //     <li key={Math.random()}>
            //       <Dropdown
            //         key={Math.random()}
            //         className="innerDropdown"
            //         dropdownList={{
            //           title: el.title,
            //           list: el.list,
            //         }}
            //         selectionModifier={el.selectionModifier}
            //       ></Dropdown>
            //     </li>
            //   );
            // } else {
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
                />
                <label htmlFor={innerInputID} className="itemLabel">
                  {el}
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
