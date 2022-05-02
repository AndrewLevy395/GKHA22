import React, { useState, useEffect } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";

function History() {
  const { state } = useLocation();
  const { userName } = state;
  return (
    <body>
      <h1>Coach {userName}</h1>
      <h2>History</h2>
      <ul>
        <li>
          {" "}
          Season 1: Vancouver Canucks (Chris, Mike) defeats Tornto Maple Leafs
          (Andy, Mikey){" "}
        </li>
        <li> Season 2: LOCKOUT</li>
        <li>
          {" "}
          Season 3: GSquad (Austin, Collin, Jarrett, Ricky) defeats Plundering
          Hippos (Chris, Ian, Matt)
        </li>
        <li>
          {" "}
          Season 4: Bamar Crab People (Andy, Austin, Mike) defeats Plundering
          Hippos (Chris, George, Ian, Matt){" "}
        </li>
        <li>
          {" "}
          Season 5: Route 10 Bobcats (Collin, Thom) defeats Strathmore Buzzkill
          (Mike, Sal)
        </li>
        <li>
          {" "}
          Season 6: 203 Magic (Alec, Chris) defeats Worcester Bridge (Mike, Sal)
        </li>
        <li>
          {" "}
          Season 7: Central Michigan Chippewas (Mikey, Thom) defeats American
          Revolution (Andy, Mike)
        </li>
      </ul>
      <Link to="/franchise_menu" state={{ userName: userName }}>
        <button class="button">Back</button>
      </Link>
    </body>
  );
}

export default History;
