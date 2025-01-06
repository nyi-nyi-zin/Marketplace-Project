import axios from "axios";

const getFreshLocalStorage = () => {
  const freshToken = localStorage.getItem("token");
  return freshToken;
};

export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}`,
  headers: {
    Authorization: `Bearer ${getFreshLocalStorage()}`,
  },
});
