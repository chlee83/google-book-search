import React from "react";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark text-light">
      <a className="navbar-brand" href="/">
        Google Books
      </a>
      <a className="nav-link text-light" href="/">
        Search
      </a>
      <a className="nav-link text-light" href="/saved">
        Saved
      </a>
    </nav>
  );
}

export default Nav;
