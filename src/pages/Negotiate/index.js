import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import LoggedLayout from '../../components/LoggedLayout';
import PageWrapper from '../../components/PageWrapper';
import Button from '../../components/Button';
import Title from '../../components/Title';
import Input from '../../components/Input';
import Table from '../../components/Table';
import stocks from '../../data/stocks.json'
import { formatCurrencyToBRL } from '../../utils/currency';
import {
  saveUserStocks,
  getUserStocks,
  saveBalance,
  getBalance
} from '../../utils/localStorage';
import './styles.css';

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
      saveBalance(
        (Number(balance) + Number(saleAmount) * Number(stock.price)).toFixed(2)
      );

      return;
    }

    saveBalance(
      (Number(balance) - Number(purchaseAmount) * Number(stock.price)).toFixed(2)
    );
  }

  const handleSave = (event) => {
    event.preventDefault();

    const confirmation = window.confirm('Deseja salvar as alterações?');

    if (confirmation) {
      calculateBalance();
      save();

      navigate('/wallet');
    }
  }

  return (
    <LoggedLayout>
      <PageWrapper>
        <Title>Comprar/Vender Ação:</Title>
        <Table columns={columns} renderRows={renderRow} />

        <form className="negotiate-page-form" onSubmit={handleSave}>
          <Input
            label={`
                Valor total da compra
                ${formatCurrencyToBRL(purchaseAmount * stock.price)}
              `}
            type="number"
            id="purchaseAmount"
            name="purchaseAmount"
            placeholder="Informe a quantidade de compra"
            min="1"
            max={Math.floor(balance / stock.price)}
            value={purchaseAmount}
            onChange={({ target }) => setPurchaseAmount(target.value)}
            required
          />

          <Button
            variant="primary"
            size="medium"
            margin="small"
          >
            Comprar
          </Button>
        </form>

        <form className="negotiate-page-form" onSubmit={handleSave}>
          {userStocks.some((item) => item.id === stock.id) ?
            (
              <>
                <Input
                  label={`
                      Valor total da venda
                      ${formatCurrencyToBRL(saleAmount * stock.price)}
                    `}
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

                <Button
                  variant="secondary"
                  size="medium"
                  margin="small"
                >
                  Vender
                </Button>
              </>
            ) : null
          }
        </form>
      </PageWrapper>
    </LoggedLayout >
  )
}

export default Negotiate;