import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LoggedLayout from '../../components/LoggedLayout';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Title from '../../components/Title';
import { saveBalance, getBalance } from '../../utils/localStorage'
import './styles.css';

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

  const goBackWallet = () => {
    navigate('/wallet');
  }

  return (
    <LoggedLayout>
      <main className="balance-page">
        <div className="balance-page__content">
          <Title>Depósito/Retirada</Title>

          <div className='form-balance'>
            <form className="balance-page__form" onSubmit={handleSave}>
              <Input
                type="number"
                id="depositValue"
                name="depositValue"
                placeholder="Informe o valor do depósito"
                min="1"
                value={depositValue}
                onChange={({ target }) => setDepositValue(target.value)}
                required
              />

              <Button
                variant="primary"
                size="medium"
                margin="small"
              >
                Depositar
              </Button>
            </form>

            <form className="balance-page__form" onSubmit={handleSave}>
              <Input
                type="number"
                id="removeValue"
                name="removeValue"
                placeholder="Informe o valor da retirada"
                min="1"
                max={balance}
                value={withdrawValue}
                onChange={({ target }) => setWithdrawValue(target.value)}
                required
              />

              <Button
                variant="secondary"
                size="medium"
                margin="small"
              >
                Retirar
              </Button>
            </form>

            <Button
              type="button"
              variant="success"
              size="medium"
              onClick={goBackWallet}
            >
              Carteira
            </Button>
          </div>
        </div>
      </main>
    </LoggedLayout >
  )
}

export default Balance;