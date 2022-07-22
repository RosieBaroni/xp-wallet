import React from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../../components/Header';
import Table from '../../components/Table';
import stocks from '../../data/stocks.json'
import { getUserStocks } from '../../utils/localStorage'
import { formatCurrencyToBRL } from '../../utils/currency';
import './styles.css';

function Wallet() {
  const userStocks = getUserStocks();
  const availableStocks = stocks
    .filter((availableStock) => !userStocks
      .some((myStock) => myStock.id === availableStock.id));

  const columns = [
    'Ação',
    'Quantidade',
    'Valor unitário',
  ];

  const navigate = useNavigate();

  const handleOpenNegotiate = (id) => {
    navigate(`/negotiate/${id}`);
  };

  const renderStocks = (stocks) => {
    return stocks?.map((stock) => (
      <tr key={stock.id}>
        <td>
          {stock.symbol}
        </td>
        <td>
          {stock.amount || 1}
        </td>
        <td>
          {formatCurrencyToBRL(stock.price)}
        </td>
        {stock.amount ?
          (
            <td>
              {formatCurrencyToBRL(stock.price * stock.amount)}
            </td>
          ) : null
        }
        <td>
          <button
            type="button"
            onClick={() => handleOpenNegotiate(stock.id)}
          >
            Comprar
          </button>

          {userStocks.some((item) => item.id === stock.id) ?
            (
              <button className='buttonSale'
                type="button"
                onClick={() => handleOpenNegotiate(stock.id)}
              >
                Vender
              </button>
            ) : null
          }
        </td>
      </tr>
    ))
  }

  return (
    <main className="container-wallet">
      <Header />

      <div className="content-wallet">
        <h2>Minhas Ações:</h2>
        <Table columns={
          [...columns, 'Valor total', 'Negociar']}
          renderRows={() => renderStocks(userStocks)}
        />

        <h2>Disponíveis para investir:</h2>
        <Table columns={
          [...columns, 'Negociar']}
          renderRows={() => renderStocks(availableStocks)}
        />
      </div>
    </main>
  )
}

export default Wallet;