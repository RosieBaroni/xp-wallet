import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

import Button from '../Button';
import { getEmail, getBalance } from '../../utils/localStorage';
import { formatCurrencyToBRL } from '../../utils/currency';
import './styles.css';
import Title from '../Title';

function Header() {
  const email = getEmail().email;
  const balance = getBalance();
  const navigate = useNavigate();
  const location = useLocation();

  const onButtonBalance = () => {
    navigate('/balance');
  }

  const hasButtonBalance = () => location.pathname !== '/balance';

  return (
    <header className="header">
      <Title as="h1" highlight>XP Wallet</Title>

      <div className="header__info">
        <p data-testid="email-field">
          Usuário:{' '}
          {email}
        </p>

        <p>
          Saldo:{' '}
          {formatCurrencyToBRL(balance)}
        </p>

        {hasButtonBalance() ?
          (
            <Button
              type="button"
              variant="success"
              size="medium"
              onClick={onButtonBalance}
            >
              Depósito/Retirada
            </Button>
          ) : null
        }

        <Link className="header__link" to='/'>
          Sair
          <img
            src={`${process.env.PUBLIC_URL}/assets/icons/logout.svg`}
            alt="ícone de sair"
          />
        </Link>
      </div>
    </header >
  )
}

export default Header;