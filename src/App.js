import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Wallet from './pages/Wallet';
import Negotiate from './pages/Negotiate';
import Balance from './pages/Balance';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/wallet" element={<Wallet />} />
      <Route path="/negotiate/:stockId" element={<Negotiate />} />
      <Route path="/balance" element={<Balance />} />
    </Routes>
  );
}

export default App;
