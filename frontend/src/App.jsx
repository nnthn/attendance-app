import React from 'react';
import Nav from './components/Nav';
import Students from './components/Students.jsx';
import {BrowserRouter,Route,Routes,Link,Redirect} from "react-router-dom";
import Home from './Home';
import Siginin from './components/Signin';

function App() {
    return (
        <BrowserRouter>
          <Nav/>
          <Routes>
            <Route path ='/siginin'  element={<Siginin/>} />
            <Route path ='/students'  element={<Students/>} />
            <Route path = '/' element={<Home/>} index={true}/>
          </Routes>
        </BrowserRouter>
  );
}

export default App;
