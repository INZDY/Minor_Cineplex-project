import React from "react";
import { useState } from "react";
import Axios from "axios";
import "./Analysis.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../Home.js";
import AgeRange from "./AgeRange.js";
import BranchRevenue from "./BranchRevenue.js";
import SeatPopularity from "./SeatPopularity.js";
import AiringLanguage from "./AiringLanguage.js";
import ShowtimePopularity from "./ShowtimePopularity.js";

export default function () {
  const [component, setComponent] = useState(<Home />);

  const HandlerNavClick = (selectedComponent) => {
    setComponent(selectedComponent);
  };

  return (
    <>
      <nav className="nav">
        <ul>
          <li>
            <a onClick={() => HandlerNavClick(<AgeRange />)}>Age range</a>
          </li>
          <li>
            <a onClick={() => HandlerNavClick(<BranchRevenue />)}>
              Branch revenue
            </a>
          </li>
          <li>
            <a onClick={() => HandlerNavClick(<SeatPopularity />)}>
              Seat popularity
            </a>
          </li>
          <li>
            <a onClick={() => HandlerNavClick(<AiringLanguage />)}>
              Airing language
            </a>
          </li>
          <li>
            <a onClick={() => HandlerNavClick(<ShowtimePopularity />)}>
              Showtime popularity
            </a>
          </li>
        </ul>
      </nav>
      {component}
    </>
  );
}
