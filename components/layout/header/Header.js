import Navbar from "../../UI/Navbar";
import Button from "../../UI/Button";
import React, { useState, useEffect } from "react";

export default function Header() {
  let confettiArray = [];
  for (let i = 0; i < 50; i++) {
    confettiArray.push(<i key={Math.random()}></i>);
  }

  const [isVisible, setIsVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const scrollHandler = () => {
    setIsVisible(false);
    setIsChecked(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  return (
    <header className="header">
      <img
        className="header__illustration"
        src="/images/isometric-girls-room.png"
        alt="girls playing"
      />
      <svg
        width="100%"
        height="100%"
        id="svg"
        viewBox="0 0 1440 400"
        className="svgAboveIllustration transition duration-300 ease-in-out delay-150"
      >
        <path
          d="M 0,400 C 0,400 0,200 0,200 C 305,202.5 610,205 850,205 C 1090,205 1265,202.5 1440,200 C 1440,200 1440,400 1440,400 Z"
          stroke="none"
          strokeWidth="0"
          fill="#6b2c3c"
          fillOpacity="1"
          className="transition-all duration-300 ease-in-out delay-150 path-0"
          transform="rotate(-180 720 200)"
        ></path>
      </svg>

      <div className="header__content">
        <input
          type="checkbox"
          id="menu-checkbox"
          onChange={(e) => {
            setIsChecked(!isChecked);
            setIsVisible(!isVisible);
          }}
          defaultChecked={isChecked}
        ></input>
        <label htmlFor="menu-checkbox">
          <Button className="header__content__menu-btn">&#9776;</Button>
        </label>
        {isVisible && <Navbar></Navbar>}
        <div className="article">
          <div className="article__heading-container">
            <h1 className="article__heading-container__heading">
              Activities for kids
            </h1>
            {confettiArray}
          </div>

          <p className="article__text">
            Any parent wants to have fun with their kids and ensure that their
            little ones will have great childhood. We're here for you to present
            ways to interact with your children. Here you can find games
            depending on a child's age, interests and even items that you have
            at home!
          </p>
          <Button href="#gamesDashboard" className="article__button">
            let's go!
          </Button>
        </div>
      </div>
    </header>
  );
}
