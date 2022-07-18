import React from 'react';

function StocksTable({ stocks }) {
  const columns = [
    'Ação',
    'Quantidade',
    'Valor (R$)',
    'Negociar',
  ]

  const onButtonBuy = () => {
  };

  const onButtonSell = () => {
  };


  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {stocks?.map((stock) => (
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
        ))}
      </tbody>
    </table >
  )
}

export default StocksTable;