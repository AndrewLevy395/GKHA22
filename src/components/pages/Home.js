import React from "react";

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <br />
      <ul>
        <li>
          {/* Endpoint to route to Home component */}
          <Link to="/">Home</Link>
        </li>
        <li>
          {/* Endpoint to route to About component */}
          <Link to="/sim">Sim</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
