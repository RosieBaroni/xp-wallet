import React from 'react';
import { useNavigate } from 'react-router-dom';

import LoggedLayout from '../../components/LoggedLayout';
import Button from '../../components/Button';
import Title from '../../components/Title';
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
          <Button
            type="button"
            variant="primary"
            size="small"
            margin="small"
            onClick={() => handleOpenNegotiate(stock.id)}
          >
            Comprar
          </Button>

          {userStocks.some((item) => item.id === stock.id) ?
            (
              <Button
                type="button"
                variant="secondary"
                size="small"
                margin="small"
                onClick={() => handleOpenNegotiate(stock.id)}
              >
                Vender
              </Button>
            ) : null
          }
        </td>
      </tr>
    ))
  }

  return (
    <LoggedLayout>
      <main className="wallet-page">
        <div className="wallet-page__content">
          <Title>Minhas Ações:</Title>
          <Table columns={
            [...columns, 'Valor total', 'Negociar']}
            renderRows={() => renderStocks(userStocks)}
          />

          <Title>Disponíveis para investir:</Title>
          <Table columns={
            [...columns, 'Negociar']}
            renderRows={() => renderStocks(availableStocks)}
          />
        </div>
      </main>
    </LoggedLayout>
  )
}

export default Wallet;