import axios from "axios";

const BACKEND_BASE_URL = "http://localhost:3001";

export const getData = async (year: string) => {
  return axios.get(`${BACKEND_BASE_URL}/${year}`);
};
