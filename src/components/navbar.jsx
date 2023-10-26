import React from "react";
import "../styles/navbar.css";

const Navbar = () => {
  return (
      <nav>
        <ul className='titreGauche'>
          <li><div className="logo" /></li>
        </ul>
        <ul>
            <li><a href="#research1">Caspar DIMANCHE</a></li>
            <li><a href="#research2">Loïc RUSSELL</a></li>
            <li><a href="#research3">Camille SIMON</a></li>
        </ul>
      </nav>
  );
};

export { Navbar };