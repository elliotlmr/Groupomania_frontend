const token = JSON.parse(localStorage.getItem("user"));

export const isLogin = () => {
  if (token) {
    return true;
  } else {
    return false;
  }
};
