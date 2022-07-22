import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { saveEmail, getBalance } from '../../utils/localStorage'
import './styles.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setDisabled] = useState(true);
  const navigate = useNavigate();
  const balance = getBalance();

  useEffect(() => {
    const isDisabled = () => {
      const minPassLength = 6;

      if (email.includes('@')
        && email.includes('.com')
        && password.length >= minPassLength
      ) {
        setDisabled(false)

        return;
      };

      setDisabled(true)
    };

    isDisabled();
  }, [email, password]);

  const onButtonClick = () => {
    saveEmail(email);

    if (balance === 0) {
      navigate('/balance');

      return;
    }

    navigate('/wallet');
  };

  return (
    <main className="container">
      <div className="content" data-testid="page-login">
        <h1>XP Wallet</h1>

        <form className="form-login">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Digite seu email"
            data-testid="email-input"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            required
          />

          <input
            type="password"
            id="password"
            name="password"
            placeholder="Digite sua senha"
            data-testid="password-input"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            required
          />

          <button
            className="button"
            type="button"
            disabled={isDisabled}
            onClick={onButtonClick}
          >
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}

export default Login;