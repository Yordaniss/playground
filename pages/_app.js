import React from "react";
import "../shared/styles/global-css/index.css";
import Layout from "../components/layout/Layout";
import PostsDashboard from "../components/layout/postsDashboard/PostsDashboard";

function App({ Component, pageProps }) {
  return (
    <Layout>
      {Component !== undefined && Component.name !== "Home" && (
        <Component {...pageProps}></Component>
      )}
      {Component === undefined && Component.name === "Home" && (
        <PostsDashboard></PostsDashboard>
      )}
    </Layout>
  );
}

export default App;
