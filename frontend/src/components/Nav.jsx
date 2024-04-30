import React from "react";
import { Link } from 'react-router-dom';
import './styles.css';
import logoimg from "./assets/logo.svg";
import Students from "./Students.jsx";

export default function Nav() {
  return (
    <div className="Navbar">
      <div className="logogrp">
        <h2 className="attendify">SRAS</h2>
      </div>
    </div>
  );
}
