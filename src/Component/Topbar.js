import React from "react";
import "../Css/topbar.css";
const Topbar = () => {
  return (
    <>
      <div className="topbar">
        <a className="active fa fa-home" href="/">
          &nbsp; Home
        </a>

        <a href="/Map" className="fa fa-cutlery">
          &nbsp; Restaurants
        </a>
      </div>
    </>
  );
};

export default Topbar;
