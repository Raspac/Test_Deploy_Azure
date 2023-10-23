import React from "react";
import "../styles/navbar.css";

const Navbar = () => {
  return (
      <nav>
        <ul>
            <li><a href="#research1">Research 1</a></li>
            <li><a href="#research2">Research 2</a></li>
            <li><a href="#research3">Research 3</a></li>
        </ul>
      </nav>
  );
};

export { Navbar };