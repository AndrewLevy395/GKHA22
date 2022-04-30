import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";

import "../../styles/franchise/FranchiseNew.css";

// import { API } from "aws-amplify";

const BUILD_ENV = process.env.REACT_APP_USER_BRANCH;

const myAPI = "franchiseData-" + BUILD_ENV;
// const path = "/player";

function FranchiseNew() {
  console.log(BUILD_ENV);
  //set variables
  const [userName, setUserName] = useState("Bob");
  const [userTeam, setUserTeam] = useState("Alaskan Thunder");
  const [validUser, setValidUser] = useState(false);

  function createUser() {
    // API.post(myAPI, path + "/" + playerId);
    //     .then((response) => {
    //       setPlayers([response]);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
  }

  function checkUser() {
    if (userName) {
      createUser();
      setValidUser(true);
    }
  }

  return (
    <body>
      <h1>Franchise Create</h1>
      <form>
        <p>
          Coach {userName} of the {userTeam}
        </p>
        <input
          required
          autocomplete="off"
          type="text"
          placeholder="Username"
          name="username"
          onChange={(e) => setUserName(e.target.value)}
        ></input>
        <br />
        <select
          required
          name="userteam"
          onChange={(e) => setUserTeam(e.target.value)}
        >
          <option value="Alaskan Thunder">Alaskan Thunder</option>
          <option value="American Revolution">American Revolution</option>
          <option value="Boondock Beluga Whales">Boondock Beluga Whales</option>
          <option value="Florida Tropics">Florida Tropics</option>
          <option value="Smashville Chippewas">Smashville Chippewas</option>
          <option value="Southside Spartans">Southside Spartans</option>
        </select>
        <br />
        <button type="button" onClick={checkUser}>
          Create
        </button>
      </form>
      {validUser && <Navigate to="/home"></Navigate>}
      <Link to="/home">
        <button class="button">Back!</button>
      </Link>
    </body>
  );
}

export default FranchiseNew;
