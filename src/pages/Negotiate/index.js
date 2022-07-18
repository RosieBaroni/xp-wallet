import React from 'react';
import Header from '../../components/Header/Header';
import StocksTable from '../../components/StocksTable';

function Negotiate() {
  const columns = [
    'Ação',
    'Quantidade',
    'Valor (R$)'
  ]

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
      </tr>
    ))
  }

  return (
    <div>
      <Header />

      <h1>
        Comprar/Vender Ação:
      </h1>
      <StocksTable columns={columns} renderRows={() => renderRows([])} />
    </div>
  )
}

export default Negotiate;