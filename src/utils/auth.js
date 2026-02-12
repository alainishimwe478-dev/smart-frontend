export const logout = () => {
  localStorage.clear();
  window.location.href = "/"; // redirect to login
};
