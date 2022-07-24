import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/Button';
import Input from '../../components/Input';
import Title from '../../components/Title';
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

  const onButtonLogin = () => {
    saveEmail(email);

    if (balance === 0) {
      navigate('/balance');

      return;
    }

    navigate('/wallet');
  };

  return (
    <main className="login-page">
      <Title as="h1" highlight>XP Wallet</Title>

      <form className="login-page__form">
        <Input
          type="email"
          id="email"
          data-test="email"
          name="email"
          placeholder="Digite seu email"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          required
        />

        <Input
          type="password"
          id="password"
          name="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          required
        />

        <Button
          type="button"
          variant="success"
          disabled={isDisabled}
          onClick={onButtonLogin}
        >
          Entrar
        </Button>
      </form>
    </main>
  );
}

export default Login;