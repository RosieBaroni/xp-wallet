export const saveEmail = (email) => {
  localStorage.setItem('user', JSON.stringify({ email }));
};

export const getEmail = () => JSON.parse(localStorage.getItem('user'));