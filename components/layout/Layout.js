import React from "react";
import Head from "next/head";
import Header from "./header/Header";
import Navbar from "../UI/Navbar";
import PostsDashboard from "./postsDashboard/PostsDashboard";
import Footer from "./footer/Footer";

export default function Layout({ children }) {
  return (
    <React.Fragment>
      <Head>
        <link rel="shortcut icon" href="/icons/sun.ico" />
      </Head>
      {!children[0] ? (
        <React.Fragment>
          <Header>
            <Navbar></Navbar>
          </Header>
          <PostsDashboard></PostsDashboard>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Navbar></Navbar>
          <React.Fragment>{children}</React.Fragment>
        </React.Fragment>
      )}
      <Footer></Footer>
    </React.Fragment>
  );
}
