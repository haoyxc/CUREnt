import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function LoginHeader() {
  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand">Navbar</a>
        <form className="form-inline">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button>Search</button>
        </form>
      </nav>
    </div>
  );
}
