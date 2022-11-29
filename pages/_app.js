import React from "react";
import "../shared/styles/global-css/index.css";
import Layout from "../components/layout/Layout";
import PostsDashboard from "../components/layout/postsDashboard/PostsDashboard";

function App({ Component, pageProps }) {
  console.log(Component);
  return (
    <Layout>
      {Component !== undefined && Component.name !== "Home" && (
        <Component {...pageProps}>{console.log(Component)}</Component>
      )}
      {Component === undefined && Component.name === "Home" && (
        <PostsDashboard></PostsDashboard>
      )}
    </Layout>
  );
}

export default App;
