import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import Records from './components/records';
import Navbar from './components/navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { useLocation } from "react-router-dom";


export default function App() {


  return (
    
    <div className="App">
      
      <Navbar />
      <Records />
    </div>

  );
}


