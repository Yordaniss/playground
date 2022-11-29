import React from "react";
import Head from "next/head";
// import PostsDashboard from "../components/layout/postsDashboard/PostsDashboard";
import Header from "./header/Header";
import Navbar from "../UI/Navbar";
import PostsDashboard from "./postsDashboard/PostsDashboard";

export default function Layout({ children }) {
  // console.log(!children[0]);
  return (
    <React.Fragment>
      <Head>
        <link rel="shortcut icon" href="/icons/sun.ico" />
      </Head>
      <Navbar></Navbar>
      {!children[0] ? (
        <React.Fragment>
          <Header></Header>
          <PostsDashboard></PostsDashboard>
        </React.Fragment>
      ) : (
        <React.Fragment>{children}</React.Fragment>
      )}
    </React.Fragment>
  );
}
