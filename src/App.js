
import React, {useState}from 'react';
import NoteState from './context/note/stateContext';


import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';


function App() {

  return (
    <div className="App">
    <NoteState>
    <Router>
    <Navbar />
    <Alert/>
    <div className="container">
      <Routes>
        <Route exact path='/'  Component={Home} ></Route>
        <Route exact path='/about' Component={About}></Route>
        <Route exact path='/login'  Component={Login} ></Route>
        <Route exact path='/signup' Component={Signup}></Route>
      </Routes>
    </div>
    </Router>
    </NoteState>
    </div>
  );
}

export default App;
