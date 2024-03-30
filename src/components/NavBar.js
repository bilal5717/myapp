import { useState } from "react";
import React from "react";
import { NavLink } from "react-router-dom";
import {HamburgetMenuClose,HamburgetMenuOpen} from './Icons';
import '../components/NavBar.css'
function NavBar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  return (
    <>
        <div>
        <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            <span>Staculus Gebra</span>
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
          
            <li className="nav-item">
              <NavLink
                exact
                to="/home"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/History"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                History
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/Notebook"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Notebook
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/Theme"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
               Read Me
              </NavLink>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
           

            {click ? (
              <span className="icon">
                 <HamburgetMenuClose />
              </span>
            ) : (
              <span className="icon">
                <HamburgetMenuOpen />
              </span>
            )}
          </div>
        </div>
      </nav>
        </div>
    </>
  );
}

export default NavBar;
