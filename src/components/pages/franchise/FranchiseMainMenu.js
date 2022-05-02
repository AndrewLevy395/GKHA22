import React, { useState, useEffect } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";

function FranchiseMainMenu() {
  const { state } = useLocation();
  const { userName } = state;
  return (
    <body>
      <h1>Coach {userName}</h1>
      <ul>
        <li>
          {/* Endpoint to route to About component */}
          <Link to="/home">Sim Next Game</Link>
        </li>
        <li>
          {/* Endpoint to route to About component */}
          <Link to="/home">Standings</Link>
        </li>
        <li>
          {/* Endpoint to route to About component */}
          <Link to="/home">Schedule</Link>
        </li>
        <li>
          {/* Endpoint to route to About component */}
          <Link to="/history" state={{ userName: userName }}>
            History
          </Link>
        </li>
      </ul>
      <Link to="/home">
        <button class="button">Home</button>
      </Link>
    </body>
  );
}

export default FranchiseMainMenu;
