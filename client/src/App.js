import React from "react";
import Navbar from "./components/Navbar";
import MainPanel from "./components/MainPanel";
import "materialize-css";

function App() {
  return (
    <div
      style={{
        width: "100%",
        height: "50vh",
      }}>
      <Navbar />
      <MainPanel />
    </div>
  );
}

export default App;
