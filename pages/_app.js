import React from "react";
import GamesDashboard from "./layout/gamesDashboard/GamesDashboard";
import Header from "./layout/header/Header";
import "./index.css";

function App() {
  return (
    <React.Fragment>
      <Header></Header>
      <GamesDashboard></GamesDashboard>
    </React.Fragment>
  );
}

export default App;
