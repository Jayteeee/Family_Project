const getToken = () => {
  return sessionStorage.getItem("token");
};

const insertToken = (token) => {
  sessionStorage.setItem("token", token);
};

const removeToken = () => {
  sessionStorage.removeItem("token");
};

export { getToken, insertToken, removeToken };
