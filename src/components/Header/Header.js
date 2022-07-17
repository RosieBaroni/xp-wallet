import React from 'react';
import { getEmail } from '../../utils/localStorage';

function Header() {
  const email = getEmail().email;

  return (
    <header>
      <div className="user-info">
        <p data-testid="email-field">
          Usuário:
          {email}
        </p>
      </div>
    </header>
  )
}

export default Header;