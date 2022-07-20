export const saveEmail = (email) => {
  localStorage.setItem('user', JSON.stringify({ email }));
};

export const saveUserStocks = (stocks) => {
  localStorage.setItem('stocks', JSON.stringify(stocks));
}

export const getUserStocks = () => JSON.parse(localStorage.getItem('stocks')) || [];

export const getEmail = () => JSON.parse(localStorage.getItem('user'));