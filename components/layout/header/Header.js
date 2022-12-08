import Button from "../../UI/Button";
import React from "react";
import Head from "next/head";

export default function Header(props) {
  return (
    <React.Fragment>
      <Head>
        <link rel="shortcut icon" href="/icons/sun.ico" />
        <title>Playground</title>
      </Head>
      <header className="header">
        <div className="inner-container">
          <img
            className="header__illustration"
            src="/images/isometric-girls-room.png"
            alt="girls playing"
          />
          <div className="header__content">
            {props.children && props.children}

            <div className="article">
              <div className="article__heading-container">
                <h1 className="article__heading-container__heading">
                  Activities for kids
                </h1>
              </div>

              <div className="article__text">
                <p>
                  Any parent wants to have fun with their kids and ensure that
                  their little ones will have great childhood.
                </p>
                <br />
                <p>
                  We're here for you to present ways to interact with your
                  children. Here you can find games depending on a child's age,
                  interests and even items that you have at home!
                </p>
              </div>
              <Button href="#postsDashboard" className="article__button">
                let's go!
              </Button>
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
}
