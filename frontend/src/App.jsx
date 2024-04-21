import React from 'react';
import Nav from './components/Nav';
import Students from './components/Students.jsx';
import {BrowserRouter,Route,Routes,Link} from "react-router-dom";
import Home from './Home';
import Siginin from './components/Signin';
import Template from './components/Template.jsx';
import "./index.css"
import "./App.css"
function App() {
    return (
        <BrowserRouter>
          <Nav/>
          <Routes>
            <Route path ='/siginin'  element={<Siginin/>} />
            <Route path ='/students'  element={<Students/>} />
            <Route path = '/' element={<Home/>} index={true}/>
           <Route path="/template" element={<Template />} />

          </Routes>
        </BrowserRouter>
  );
}

export default App;
