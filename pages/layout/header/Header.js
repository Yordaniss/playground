import Nav from "../../components/nav/Nav";
import Button from "../../components/UI/button/Button";
import React, { useState, useEffect } from "react";

export default function Header() {
  let confettiArray = [];
  for (let i = 0; i < 50; i++) {
    confettiArray.push(<i></i>);
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
        {console.log("visibility: " + isVisible)}
        {console.log("checked: " + isChecked)}
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
            Discover games
          </Button>
        </div>
      </div>
    </header>
  );
}
