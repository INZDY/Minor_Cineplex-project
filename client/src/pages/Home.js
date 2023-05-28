import React from "react";
import logo from "../pictures/logo.png";

function Home() {
  return (
    <div className="pagecontainer home">
      <div className="homeimg">
        <img src={logo} />
      </div>
    </div>
  );
}

export default Home;
