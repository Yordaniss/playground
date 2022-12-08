import React, { useState, useEffect } from "react";
import Link from "next/link";
import Button from "./Button";
import Dropdown from "./Dropdown";
import { getCookie, removeCookies } from "cookies-next";

export default function Navbar() {
  let navItems = [
    { title: "home", href: "/" },
    { title: "about", href: "/about" },
    { title: "add post", href: "/addPost" },
  ];

  const dropdownListNotLogged = {
    key: Math.random(),
    title: "Profile",
    list: [
      {
        optionTitle: "Sign in",
        href: "/sign_in",
      },
      {
        optionTitle: "Sign up",
        href: "/sign_up",
      },
    ],
  };
  const dropdownListLogged = {
    key: Math.random(),
    title: "Profile",
    list: [
      {
        optionTitle: "Sign out",
        href: "/",
      },
    ],
  };

  const [isChecked, setIsChecked] = useState(false);

  const scrollHandler = () => {
    setIsChecked(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  const [dropdown, setDropdown] = useState(null);
  useEffect(() => {
    console.log(getCookie("token"));
    const onSignOut = () => removeCookies("token");
    let selectionModifier;
    let dropdownList;
    if (getCookie("token")) {
      selectionModifier = "PROFILE__LOGGED";
      dropdownList = dropdownListLogged;
    } else {
      selectionModifier = "PROFILE__NOT__LOGGED";
      dropdownList = dropdownListNotLogged;
    }

    setDropdown(
      <Dropdown
        selectionModifier={selectionModifier}
        dropdownList={dropdownList}
        onSignOut={onSignOut}
      ></Dropdown>
    );
  }, [getCookie("token")]);

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
                <Link href={item.href}>{item.title}</Link>
              </li>
            );
          })}
          <li key={Math.random()} className="nav__list-item">
            {dropdown && dropdown}
          </li>
        </ul>
      </nav>
    </React.Fragment>
  );
}
