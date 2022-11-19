import Nav from "../../components/nav/Nav";
import Button from "../../components/UI/button/Button";
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
      {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#6b2c3c"
          fillOpacity="1"
          d="M0,96L80,85.3C160,75,320,53,480,48C640,43,800,53,960,80C1120,107,1280,149,1360,170.7L1440,192L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
        ></path>
      </svg> */}
      <svg
        width="100%"
        height="100%"
        id="svg"
        viewBox="0 0 1440 400"
        class="svgAboveIllustration transition duration-300 ease-in-out delay-150"
      >
        <path
          d="M 0,400 C 0,400 0,200 0,200 C 305,202.5 610,205 850,205 C 1090,205 1265,202.5 1440,200 C 1440,200 1440,400 1440,400 Z"
          stroke="none"
          stroke-width="0"
          fill="#6b2c3c"
          fill-opacity="1"
          class="transition-all duration-300 ease-in-out delay-150 path-0"
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
        {isVisible && <Nav></Nav>}
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
