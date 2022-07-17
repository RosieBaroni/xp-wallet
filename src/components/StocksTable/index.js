import React from 'react';

function StocksTable() {
  const columns = [
    'Ações',
    'Quantidade',
    'Valor (R$)',
    'Negociar',
  ]

  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>
    </table>
  )
}

export default StocksTable;