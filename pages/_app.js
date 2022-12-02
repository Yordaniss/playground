import React from "react";
import "../shared/styles/global-css/index.css";
import Layout from "../components/layout/Layout";
import PostsDashboard from "../components/layout/postsDashboard/PostsDashboard";
import { Provider } from "react-redux";
import store from "../store/index";

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        {Component !== undefined && Component.name !== "Home" && (
          <Component {...pageProps}></Component>
        )}
        {Component === undefined && Component.name === "Home" && (
          <PostsDashboard></PostsDashboard>
        )}
      </Layout>
    </Provider>
  );
}

export default App;
