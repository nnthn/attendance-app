import React from "react";
import './styles.css';
export default function Nav(){
    return(
        <div className="Navbar">
          <h2>Attendance App</h2>
          <div className="search">
            <input type="text" id='searchName' name='searchName' placeholder="Enter a name" className='searchbar'/>
            <button type="submit" className="searchbutton">Search</button>
          
          </div>
        </div>

    );
}
