const getToken = () => {
  return sessionStorage.getItem("token");
};

const insertToken = (token) => {
  localStorage.setItem("token", token);
};

const removeToken = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("isLogin");
};

export { getToken, insertToken, removeToken };
