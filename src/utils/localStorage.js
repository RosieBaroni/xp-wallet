export const saveEmail = (email) => {
  localStorage.setItem('user', JSON.stringify({ email }));
};

export const saveUserStocks = (stocks) => {
  localStorage.setItem('stocks', JSON.stringify(stocks));
}

export const saveBalance = (value) => {
  console.log(value)
  localStorage.setItem('balance', JSON.stringify(value));
}

export const getEmail = () => JSON.parse(localStorage.getItem('user'));

export const getUserStocks = () => JSON.parse(localStorage.getItem('stocks')) || [];

export const getBalance = () => JSON.parse(localStorage.getItem('balance')) || 0;