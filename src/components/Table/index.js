import React from 'react';

function Table({ columns, renderRows }) {
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
        {renderRows()}
      </tbody>
    </table >
  )
}

export default Table;