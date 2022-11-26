import React from "react";
import Head from "next/head";
// import PostsDashboard from "../components/layout/postsDashboard/PostsDashboard";
import Header from "./header/Header";
import Navbar from "../UI/Navbar";

export default function Layout({ children }) {
  console.log();
  return (
    <React.Fragment>
      <Head>
        <link rel="shortcut icon" href="/icons/sun.ico" />
      </Head>
      <Navbar></Navbar>
      {children.type.name === undefined ||
      children.type.name === "Home" ||
      children.type.name === "Posts" ? (
        <Header></Header>
      ) : (
        <></>
      )}

      {children}
    </React.Fragment>
  );
}
