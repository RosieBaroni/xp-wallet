import React from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../../components/Header/Header';
import StocksTable from '../../components/StocksTable';
import availableStocks from './stocks.json'

function Wallet() {
  const columns = [
    'Ação',
    'Quantidade',
    'Valor (R$)',
    'Negociar',
  ]
  const navigate = useNavigate();

  const onButtonBuy = () => {
    navigate('/negotiate');
  };

  const onButtonSell = () => {
    navigate('/negotiate');
  };

  const renderRows = (stocks) => {
    return stocks?.map((stock) => (
      <tr key={stock.id}>
        <td>
          {stock.symbol}
        </td>
        <td>
          1
        </td>
        <td>
          {stock.price}
        </td>
        <td>
          <button
            type="button"
            onClick={onButtonBuy}
          >
            Comprar
          </button>
        </td>
        <td>
          <button
            type="button"
            onClick={onButtonSell}
          >
            Vender
          </button>
        </td>
      </tr>
    ))
  }

  return (
    <div>
      <Header />

      <h2>
        Minhas Ações:
      </h2>
      <StocksTable columns={columns} renderRows={() => renderRows([])} />

      <h2>
        Disponíveis para investir:
      </h2>
      <StocksTable columns={columns} renderRows={() => renderRows(availableStocks)} />
    </div>
  )
}

export default Wallet;