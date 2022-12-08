import React from "react";

export default function ModuleWindow(props) {
  return (
    <React.Fragment>
      <div className={`module-window-blur ${props.blur && props.blur}`}></div>
      <div
        className={`module-window ${props.className && props.className} ${
          props.className ? props.className : ""
        }`}
      >
        {props.type === "ERROR" && (
          <div
            className="module-window__close-icon-container"
            onClick={() => {
              document.querySelector(".module-window").style.display = "none";
              document.querySelector(".module-window-blur").style.display =
                "none";
            }}
          >
            <svg viewBox="0 0 16 16">
              <path d="M11.2929,3.29289 C11.6834,2.90237 12.3166,2.90237 12.7071,3.29289 C13.0976,3.68342 13.0976,4.31658 12.7071,4.70711 L9.41421,8 L12.7071,11.2929 C13.0976,11.6834 13.0976,12.3166 12.7071,12.7071 C12.3166,13.0976 11.6834,13.0976 11.2929,12.7071 L8,9.41421 L4.70711,12.7071 C4.31658,13.0976 3.68342,13.0976 3.29289,12.7071 C2.90237,12.3166 2.90237,11.6834 3.29289,11.2929 L6.58579,8 L3.29289,4.70711 C2.90237,4.31658 2.90237,3.68342 3.29289,3.29289 C3.68342,2.90237 4.31658,2.90237 4.70711,3.29289 L8,6.58579 L11.2929,3.29289 Z" />
            </svg>
          </div>
        )}
        <div className="module-window__img-container">
          <img
            className={`illustration ${
              props.image?.className && props.image.className
            }`}
            src={props.image?.src}
          ></img>
        </div>
        <p className="module-window__message">{props.message}</p>
      </div>
    </React.Fragment>
  );
}
