import React from "react";
import { Link } from 'react-router-dom';
import './styles.css';
import logoimg from "./assets/logo.svg";
import Students from "./Students.jsx";

export default function Nav() {
  return (
    <div className="Navbar">
      <div className="logogrp">
        <img src={logoimg} alt="logo of attendify" />
        <h2 className="attendify">SRAAS</h2>
      </div>
      <h3><Link to="/students">Students</Link></h3>
    </div>
  );
}
