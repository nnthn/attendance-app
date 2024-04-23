import React from 'react';
import Nav from './components/Nav';
import Students from './components/Students.jsx';
import {BrowserRouter,Route,Routes,Link} from "react-router-dom";
import Home from './Home';
import AcademicDetails from "./components/StudentAcademicDetails.jsx";
import NonAcademicDetails from "./components/StudentNonAcademics.jsx";
import Siginin from './components/Signin';
import Template from './components/Template.jsx';
import "./index.css";
import "./App.css";

function App() {
    return (
        <BrowserRouter>
          <Nav/>
          <Routes>
            <Route path ='/siginin'  element={<Siginin/>} />
            <Route path ='/students'  element={<Students/>} />
            <Route path ='/academic'  element={<AcademicDetails/>} />
            <Route path ='/nonacademic'  element={<NonAcademicDetails/>} />
            <Route path = '/' element={<Home/>} index={true}/>
           <Route path="/template" element={<Template />} />

          </Routes>
        </BrowserRouter>
  );
}

export default App;
