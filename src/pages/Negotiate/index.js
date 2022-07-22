import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Header from '../../components/Header';
import Table from '../../components/Table';
import stocks from '../../data/stocks.json'
import { formatCurrencyToBRL } from '../../utils/currency';
import {
  saveUserStocks,
  getUserStocks,
  saveBalance,
  getBalance
} from '../../utils/localStorage';

function Negotiate() {
  const navigate = useNavigate();
  const { stockId } = useParams();
  const userStocks = getUserStocks();
  const [saleAmount, setSaleAmount] = useState('');
  const [purchaseAmount, setPurchaseAmount] = useState('');
  const balance = getBalance();

  const columns = [
    'Ação',
    'Quantidade',
    'Valor unitário',
    'Valor total',
  ];

  const getStock = () => {
    const userStock = userStocks.find((item) => item.id === Number(stockId));

    if (userStock) {
      return userStock;
    }

    return {
      ...stocks.find((item) => item.id === Number(stockId)),
      amount: 1,
    };
  }

  const stock = getStock();

  const renderRow = () => (
    <tr>
      <td>
        {stock.symbol}
      </td>
      <td>
        {stock.amount}
      </td>
      <td>
        {formatCurrencyToBRL(stock.price)}
      </td>
      <td>
        {formatCurrencyToBRL(stock.price * stock.amount)}
      </td>
    </tr>
  );

  const save = () => {
    const userStocks = getUserStocks();
    const userStockIndex = userStocks?.findIndex(({ symbol }) => symbol === stock.symbol)

    if (userStockIndex !== -1) {
      if (purchaseAmount) {
        userStocks[userStockIndex] = {
          ...stock,
          amount: Number(stock.amount) + Number(purchaseAmount),
        }

        saveUserStocks(userStocks);

        return;
      }

      if (saleAmount === stock.amount) {
        saveUserStocks(
          userStocks.filter(({ symbol }) => symbol !== stock.symbol)
        );

        return
      }

      userStocks[userStockIndex] = {
        ...stock,
        amount: Number(stock.amount) - Number(saleAmount),
      }

      saveUserStocks(userStocks);

      return;
    }

    saveUserStocks([
      ...userStocks,
      { ...stock, amount: purchaseAmount },
    ]);
  }

  const calculateBalance = () => {
    if (saleAmount) {
      saveBalance((balance + saleAmount * stock.price).toFixed(2));

      return;
    }

    saveBalance((balance - purchaseAmount * stock.price).toFixed(2));
  }

  const handleSave = () => {
    const confirmation = window.confirm('Deseja salvar as alterações?');

    if (confirmation) {
      calculateBalance();
      save();

      navigate('/wallet');
    }
  }

  const goBack = () => {
    navigate('/wallet');
  }

  const goBalance = () => {
    navigate('/balance');
  }

  return (
    <main className="container">
      <Header />

      <h1>Comprar/Vender Ação:</h1>
      <Table columns={columns} renderRows={renderRow} />

      <form onSubmit={handleSave}>
        <label>
          Comprar
          <input
            type="number"
            id="purchaseAmount"
            name="purchaseAmount"
            placeholder="Informe a quantidade de compra"
            min="0"
            max={Math.floor(balance / stock.price)}
            value={purchaseAmount}
            onChange={({ target }) => setPurchaseAmount(target.value)}
            required
          />
        </label>

        <p>
          Valor total da compra{' '}
          {formatCurrencyToBRL(purchaseAmount * stock.price)}
        </p>

        <input type="submit" value="Comprar" />
      </form>

      <form onSubmit={handleSave}>
        {userStocks.some((item) => item.id === stock.id) ?
          (
            <>
              <label>
                Vender
                <input
                  type="number"
                  id="saleAmount"
                  name="saleAmount"
                  placeholder="Informe a quantidade de venda"
                  min="1"
                  max={stock.amount}
                  value={saleAmount}
                  onChange={({ target }) => setSaleAmount(target.value)}
                  required
                />
              </label>

              <p>
                Valor total da venda{' '}
                {formatCurrencyToBRL(saleAmount * stock.price)}
              </p>

              <input type="submit" value="Vender" />
            </>
          ) : null
        }

        <button
          type="button"
          onClick={goBack}
        >
          Voltar
        </button>

        <button
          type="button"
          onClick={goBalance}
        >
          Depósito/Retirada
        </button>
      </form>
    </main >
  )
}

export default Negotiate;