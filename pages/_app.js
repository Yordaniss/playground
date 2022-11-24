import React from "react";
import PostsDashboard from "../components/layout/postsDashboard/PostsDashboard";
import Header from "../components/layout/header/Header";
import "../shared/styles/global-css/index.css";
import Head from "next/head";

function App() {
  return (
    <React.Fragment>
      <Head>
        <link rel="shortcut icon" href="/icons/sun.ico" />
      </Head>
      <Header></Header>
      <PostsDashboard></PostsDashboard>
    </React.Fragment>
  );
}

export default App;
