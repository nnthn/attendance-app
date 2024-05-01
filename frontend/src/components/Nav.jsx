import React from "react";
import { Link } from 'react-router-dom';
import './styles.css';
import logoimg from "../assets/mbits.svg";
import Students from "./Students.jsx";

export default function Nav() {
  return (
    <div className="Navbar">
      <div >
        <h2 className="attendify">SRAS</h2>
      </div>
      <div className="logo-grp">
        <h2>MBITS</h2>
        <img className="logo" src={logoimg} alt="logo"/>
      </div>
    </div>
  );
}
