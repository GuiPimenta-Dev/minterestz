export const isAuthenticated = () => {
  if (sessionStorage.token) {
    return true;
  }
  return false;
};
