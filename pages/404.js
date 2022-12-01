import React from "react";
import Link from "next/link";

export default function FourOhFour() {
  return (
    <div className="page-404">
      <h1 className="heading">The cat broke the connection again...</h1>
      <img className="page-404__illustration" src="images/404-cat.svg"></img>
      <Link href="/">Click to go back home</Link>
    </div>
  );
}
