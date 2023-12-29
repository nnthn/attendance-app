import React from "react";
import { Link } from 'react-router-dom';
import image from "./assets/circle.svg";
import "./styles.css";
export default function Home(){
    return(
        <div className="Bodycontainer">
          <div className="Body">
            <h2>Student attendance marking made easy</h2>
            <h4>today's session: html</h4>
            <div className="sinup" >
              <button className="login-body">LOGIN</button>
              <Link className="siginin" to="/siginin"><button className="siginin-body">SIGN IN</button></Link>

            </div></div>
          
            <img  src={image} alt="circle"/>
                  

        </div>
    );
}
