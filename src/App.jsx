import React, { useState } from 'react';
import "./index.css";
import "./app.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar"
import ContactList from './components/ContactList';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <div className='max-w-[370px] mx-auto'>
      <Router>
        <Routes>
         <Route path='/' element={<Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>}/>
        </Routes>
      </Router>
      <ContactList searchQuery={searchQuery}/>
    </div>
  );
}

export default App;
