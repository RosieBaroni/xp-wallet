import React from 'react';

import { getEmail, getBalance } from '../../utils/localStorage';
import { formatCurrencyToBRL } from '../../utils/currency';
import './styles.css';

function Header() {
  const email = getEmail().email;
  const balance = getBalance();

  return (
    <header>
      <h1>XP Wallet</h1>

      <div className="user-info">
        <p data-testid="email-field">
          Usuário:{' '}
          {email}
        </p>
        <p>
          Saldo:{' '}
          {formatCurrencyToBRL(balance)}
        </p>
      </div>
    </header>
  )
}

export default Header;