import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import React from 'react';
import logo from './logo.svg';
import './App.scss';
import Sidenav from './Components/sidenav'
import Home from "./Pages/Home";
import Settings from "./Pages/Settings";
import About from "./Pages/About";
import Calculator from "./Pages/Calculator";
const Sidebar = () => {
  return (
    <button>

    </button>
  )
}
function App() {
  return (
    <body>
      <header>
        Header
      </header>

      <Sidenav/>
      <main>
      </main>
    </body>
  );
}

export default App;
