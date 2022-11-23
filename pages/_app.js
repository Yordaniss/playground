import React from "react";
import GamesDashboard from "../components/layout/GamesDashboard";
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
      <GamesDashboard></GamesDashboard>
    </React.Fragment>
  );
}

export default App;
