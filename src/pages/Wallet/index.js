import React from 'react';

import Header from '../../components/Header/Header';
import StocksTable from '../../components/StocksTable';
import availableStocks from './stocks.json'

function Wallet() {
  return (
    <header>
      <Header />

      <h2>
        Minhas Ações:
      </h2>
      <StocksTable />

      <h2>
        Disponíveis para investir:
      </h2>
      <StocksTable stocks={availableStocks} />
    </header>
  )
}

export default Wallet;