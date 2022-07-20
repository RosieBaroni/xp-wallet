import React from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../../components/Header';
import Table from '../../components/Table';
import stocks from '../../data/stocks.json'
import { getUserStocks } from '../../utils/localStorage'

function Wallet() {
  const userStocks = getUserStocks();
  const availableStocks = stocks
    .filter((availableStock) => !userStocks
      .some((myStock) => myStock.id === availableStock.id));

  const columns = [
    'Ação',
    'Quantidade',
    'Valor (R$)',
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
          {stock.price}
        </td>
        {stock.amount ?
          (
            <td>
              {(stock.price * stock.amount).toFixed(2)}
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
              <button
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
    <div>
      <Header />

      <h2>Minhas Ações:</h2>
      <Table columns={[...columns, 'Valor total (R$)', 'Negociar']} renderRows={() => renderStocks(userStocks)} />

      <h2>Disponíveis para investir:</h2>
      <Table columns={[...columns, 'Negociar']} renderRows={() => renderStocks(availableStocks)} />
    </div>
  )
}

export default Wallet;