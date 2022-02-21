import React, { useEffect, useState } from "react";
import './App.css';

import Board, { Scores } from './components/Board';
import { Container } from "semantic-ui-react";

import Sketch from './components/Sketch';

import { BrowserRouter as Router, Routes ,Route } from 'react-router-dom';

//import Graph2 from './components/Graph2';

/*
function App() {
  return (
    <div>
       <Board />
       <Sketch />
    </div>
  );
}
*/


function App() {
  return (
    <Router>
     <Routes>
        <Route exact path="/about" element={<Board />}/>
        <Route path="/" element={<Sketch />}/>
      </Routes>
    </Router>
  );
}


export default App;

