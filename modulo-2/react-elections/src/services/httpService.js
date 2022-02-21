import axios from "axios";

const BASE_URL =
  process.env.NODE_ENV === "production" ? "tbd" : "http://localhost:3001/";

const axiosInstance = axios.create({
  timeout: 5000,
  baseURL: BASE_URL,
});

export async function getAllData(url) {
  const { data } = await axiosInstance.get(url);
  return data;
}
