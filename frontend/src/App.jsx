import React from 'react';
import Nav from './components/Nav';
import Students from './components/Students.jsx';
import {BrowserRouter,Route,Routes,Link,Redirect} from "react-router-dom";
import Home from './Home';

function App() {
    return (
        <BrowserRouter>
          <Nav/>
          <Routes>
            <Route path ='/students'  element={<Students/>} />
            <Route path = '/' element={<Home/>} index={true}/>
          </Routes>
        </BrowserRouter>
  );
}

export default App;
