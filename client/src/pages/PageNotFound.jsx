import React from "react";
import { Link } from "react-router";

function PageNotFound() {
  return (
    <div>
      <h1>PageNotFound : </h1>
      <h3>Go to Home Page: <Link to={'/'}> Home Page</Link> 
      </h3>
    </div>
  );
}

export default PageNotFound;
