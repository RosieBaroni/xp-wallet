export const saveEmail = (email) => {
  localStorage.setItem('user', JSON.stringify({ email }));
};