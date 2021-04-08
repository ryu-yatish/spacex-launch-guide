import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import Records from './components/records';
import Navbar from './components/navbar';


export default function App() {
  // const [data, setData] = useState([])
  // const [q,setQ] =useState("")

  // useEffect(()=>{
  //   fetch("https://api.spaceXdata.com/v3/launches?limit=100")
  //   .then(response => response.json())
  //   .then((json) => setData(json));
  // }, []);

  return (
    <div className="App">
  
      <Navbar />
      <Records />
    </div>
  );
}


