import React from "react";
import GamesDashboard from "./layout/gamesDashboard/GamesDashboard";
import Header from "./layout/header/Header";
import "./index.css";

function App() {
  return (
    <React.Fragment>
      <Header></Header>
      <div style={{ backgroundColor: "#f7cac9" }}>
        <svg viewBox="0 0 1440 320">
          <path
            fill="#964555"
            d="M0,32L60,32C120,32,240,32,360,74.7C480,117,600,203,720,234.7C840,267,960,245,1080,213.3C1200,181,1320,139,1380,117.3L1440,96L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          ></path>
        </svg>
      </div>
      <GamesDashboard></GamesDashboard>
    </React.Fragment>
  );
}

export default App;
