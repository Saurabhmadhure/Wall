import { myAxios } from "./Helper";

export const signUps = async (user) => {
  const response = await myAxios.post("/reg/register", user);
  return response.data;
};
export const loginUser = async (loginDetails, token) => {
  const response = await myAxios.post("/reg/authenticate", loginDetails);
  return response.data;
};
export const availableBalance = (id) => {
  const response = myAxios.post(`/all/acc/${id}`, id);
  return response.data;
};
export const deposit = (amount) => {
  const response = myAxios.post("/all/login/", amount);
  return response.data;
};
export const createNewWallet = (info, token) => {
  const headers = { Authorization: `Bearer ${token}` };
  try {
    const response = myAxios.post("/all/create", info, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const sendMoney = (info) => {
  const response = myAxios.post("/all/send", info);
  return response.data;
};
export const logOut = () => {
  const response = myAxios.post("/all/logout");
  return response.data;
};
export const showTransactions = (trans) => {
  const response = myAxios.post("/all/ent/", trans);
  return response.data;
};
