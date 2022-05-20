const getToken = () => {
  return localStorage.getItem("token");
};

const insertToken = (token) => {
  localStorage.setItem("token", token);
};

const removeToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("isLogin");
};

export { getToken, insertToken, removeToken };
