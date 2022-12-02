import React from "react";
import Link from "next/link";

export default function FourOhFour() {
  return (
    <div className="page-404">
      <h1 className="page-404__heading">
        What you were looking for is not here anymore...
      </h1>
      <div className="page-404__img-container">
        <img className="illustration" src="/images/404-cat.svg"></img>
      </div>
      <Link className="page-404__link" href="/">
        Click to go back home
      </Link>
    </div>
  );
}
