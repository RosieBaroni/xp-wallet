import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Wallet from './pages/Wallet';
import Negotiate from './pages/Negotiate';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/wallet" element={<Wallet />} />
      <Route path="/negotiate" element={<Negotiate />} />
    </Routes>
  );
}

export default App;
