import React from 'react';

import './styles.css';

function Table({ columns, renderRows }) {
  return (
    <div class="container-table">
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
    </div>
  )
}

export default Table;