import React, { useState, useEffect } from "react";
import Button from "./Button";

export default function Navbar() {
  let navItems = ["Home", "About", "Contact"];

  const [isChecked, setIsChecked] = useState(false);

  const scrollHandler = () => {
    setIsChecked(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  return (
    <React.Fragment>
      <input
        type="checkbox"
        id="menu-checkbox"
        onChange={() => {
          setIsChecked(!isChecked);
        }}
        checked={isChecked}
      ></input>
      <label htmlFor="menu-checkbox">
        <Button className="navbar--menu-btn">&#9776;</Button>
      </label>

      <nav className="nav">
        <ul className="nav__list">
          {navItems.map((item) => {
            return (
              <li key={Math.random()} className="nav__list-item">
                {item}
              </li>
            );
          })}
        </ul>
      </nav>
    </React.Fragment>
  );
}
