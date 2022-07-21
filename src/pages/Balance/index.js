import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../../components/Header';
import { saveBalance, getBalance } from '../../utils/localStorage'

function Balance() {
  const navigate = useNavigate();
  const [depositValue, setDepositValue] = useState('');
  const [withdrawValue, setWithdrawValue] = useState('');
  const balance = getBalance();

  const save = () => {
    if (depositValue) {

      saveBalance(Number(balance) + Number(depositValue));
      setDepositValue('');

      return;
    }

    saveBalance(Number(balance) - withdrawValue);
    setWithdrawValue('');

    return;
  }

  const handleSave = (event) => {
    event.preventDefault();

    const confirmation = window.confirm('Deseja salvar as alterações?');

    if (confirmation) {
      save();
    }
  }

  const goBack = () => {
    navigate('/wallet');
  }

  return (
    <div>
      <Header />

      <h2>Saldo em Conta:</h2>
      <p>{`R$ ${(balance).toFixed(2)}`}</p>

      <form onSubmit={handleSave}>
        <label>
          Depósito
          <input
            type="number"
            id="depositValue"
            name="depositValue"
            placeholder="Informe o valor do depósito"
            min="1"
            step=".01"
            value={depositValue}
            onChange={({ target }) => setDepositValue(target.value)}
            required
          />
        </label>

        <input type="submit" value="Depositar" />
      </form>

      <form onSubmit={handleSave}>
        <label>
          Retirada
          <input
            type="number"
            id="removeValue"
            name="removeValue"
            placeholder="Informe o valor da retirada"
            min="1"
            step=".01"
            max={balance}
            value={withdrawValue}
            onChange={({ target }) => setWithdrawValue(target.value)}
            required
          />
        </label>

        <input type="submit" value="Retirar" />
      </form>

      <button
        type="button"
        onClick={goBack}
      >
        Voltar
      </button>
    </div>
  )
}

export default Balance;