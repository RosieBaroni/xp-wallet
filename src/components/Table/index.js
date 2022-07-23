import React from 'react';

import './styles.css';

function Table({ columns, renderRows }) {
  return (
    <table className="table">
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
    </table>
  )
}

export default Table;