import { ConsoleLogger } from "@aws-amplify/core";
import { API } from "aws-amplify";
import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";

const loadAPI = "franchiseEvents";
const loadPath = "/loaduser";

function FranchiseLoad() {
  const [userName, setUserName] = useState("Bob");
  const [message, setMessage] = useState("");
  const [validUser, setValidUser] = useState(false);

  function loadUser() {
    API.get(loadAPI, loadPath, {
      queryStringParameters: { username: userName },
    })
      .then((response) => {
        if (response.username) {
          setValidUser(true);
        } else {
          setMessage("Invalid Username");
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
      <form>
        <input
          required
          autocomplete="off"
          type="text"
          placeholder="Username"
          name="username"
          onChange={(e) => setUserName(e.target.value)}
        ></input>
        <button type="button" onClick={loadUser}>
          Load
        </button>
        <p>{message}</p>
      </form>
      <Link to="/home">
        <button class="button">Back!</button>
      </Link>
    </body>
  );
}

export default FranchiseLoad;
