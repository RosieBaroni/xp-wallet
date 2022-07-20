import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Header from '../../components/Header';
import Table from '../../components/Table';
import stocks from '../../data/stocks.json'
import { saveUserStocks, getUserStocks } from '../../utils/localStorage'

function Negotiate() {
  const navigate = useNavigate();
  const { stockId } = useParams();
  const userStocks = getUserStocks();
  const [saleAmount, setSaleAmount] = useState('');
  const [purchaseAmount, setPurchaseAmount] = useState('');

  const columns = [
    'Ação',
    'Quantidade',
    'Valor unitário (R$)',
    'Valor total (R$)',
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
        {stock.price}
      </td>
      <td>
        {stock.price * stock.amount}
      </td>
    </tr>
  );

  const save = () => {
    const userStocks = getUserStocks();
    const userStockIndex = userStocks?.findIndex(({ symbol }) => symbol === stock.symbol)

    if (userStockIndex !== -1) {
      userStocks[userStockIndex] = {
        ...stock,
        amount: purchaseAmount ?
          Number(stock.amount) + Number(purchaseAmount)
          : Number(stock.amount) - Number(saleAmount),
      }

      saveUserStocks(userStocks);

      return;
    }

    saveUserStocks([
      ...userStocks,
      { ...stock, amount: purchaseAmount },
    ]);
  }


  const handleSave = () => {
    const confirmation = window.confirm('Deseja salvar as alterações?');

    if (confirmation) {
      save();

      navigate('/wallet');
    }
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
            // max={valor que tenho na minha carteira}
            value={purchaseAmount}
            onChange={({ target }) => setPurchaseAmount(target.value)}
            required
          />
        </label>

        <p>
          Valor total da compra (R$)
          {(purchaseAmount * stock.price).toFixed(2)}
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
                  min="0"
                  max={stock.amount}
                  value={saleAmount}
                  onChange={({ target }) => setSaleAmount(target.value)}
                  required
                />
              </label>

              <p>
                Valor total da venda (R$)
                {(saleAmount * stock.price).toFixed(2)}
              </p>

              <input type="submit" value="Vender" />
            </>
          ) : null
        }
        <button
          type="button"
          onClick={handleSave}
        >
          Voltar
        </button>
      </form>
    </main >
  )
}

export default Negotiate;