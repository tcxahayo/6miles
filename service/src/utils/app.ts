export const getToken = () => {
  return localStorage.getItem('token') || '';
};
export const setToken = (token: string | null) => {
  localStorage.setItem('token', token || '');
};
export const clearToken = () => {
  localStorage.removeItem('token');
};
