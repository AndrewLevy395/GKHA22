import React, { useState, useEffect } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";

function FranchiseMainMenu() {
  const { state } = useLocation();
  const { userName } = state;
  console.log(userName);
  return (
    <body>
      <h1>Coach {userName}</h1>
      <Link to="/home">
        <button class="button">Home</button>
      </Link>
    </body>
  );
}

export default FranchiseMainMenu;
