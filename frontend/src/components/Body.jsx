import React from "react";
import { Link } from 'react-router-dom';
import image from "./assets/circle.svg";
import "./styles.css";
export default function Home(){
    return(
        <div className="Bodycontainer">
          <div className="Body">
            <h2>Student Result Activity Analysis System</h2>
          
            <div className="sinup" >
              <Link className="siginin" to="/siginin"><button className="siginin-body">LOG IN</button></Link>

            </div></div>
          
            <img  src={image} alt="circle"/>
                  

        </div>
    );
}
