import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";

import "../../styles/franchise/FranchiseNew.css";

import { API } from "aws-amplify";

const createAPI = "franchiseEvents";
const createPath = "/createuser";

function FranchiseNew() {
  //set variables
  const [userName, setUserName] = useState("Bob");
  const [userTeam, setUserTeam] = useState("Alaskan Thunder");
  const [message, setMessage] = useState("");
  const [validUser, setValidUser] = useState(false);

  function createUser() {
    API.post(createAPI, createPath, {
      body: { username: userName, team: userTeam },
    })
      .then((response) => {
        if (response.message) {
          setMessage("Coach Name Already Exists");
        } else {
          setValidUser(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <body>
      {validUser && (
        <Navigate
          to="/franchise_menu"
          state={{ userName: userName }}
        ></Navigate>
      )}
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
        <button type="button" onClick={createUser}>
          Create
        </button>
        <p>{message}</p>
      </form>
      <Link to="/home">
        <button class="button">Back!</button>
      </Link>
    </body>
  );
}

export default FranchiseNew;
