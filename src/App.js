import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/wallet" element={<Wallet />} />
    </Routes>
  );
}

export default App;
