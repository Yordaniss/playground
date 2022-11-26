import React from "react";
import "../shared/styles/global-css/index.css";
import Layout from "../components/layout/Layout";

function App({ Component, pageProps }) {
  return (
    <Layout>
      {Component !== undefined && Component.name !== "Home" ? (
        <Component {...pageProps}></Component>
      ) : (
        <></>
      )}
    </Layout>
  );
}

export default App;
