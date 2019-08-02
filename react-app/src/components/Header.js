import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Header() {
  return (
    <div>
      <nav className="navbar navbar-light bg-light home-navbar">
        <div />
        <a className="navbar-brand header-logo">CUREnt.</a>
        <div>
          <a href="" className="logout-btn">
            Logout
          </a>
        </div>
      </nav>
    </div>
  );
}
