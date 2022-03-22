import React from "react";
import Style from "./index.module.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className={Style.header}>
      <nav>
        <ul>
          <li>
            <a href="/">
              <div className={Style.logo}>
                <h1>Daily News</h1>
              </div>
              <div className={Style.pages}>
                <h1>
                  <Link to="/">Home</Link>
                </h1>
                <h1>
                  <Link to="/about">About</Link>
                </h1>
                <h1>
                  <Link to="/contact">Contact</Link>
                </h1>
              </div>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
