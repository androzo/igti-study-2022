import axios from "axios";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://sable-sulky-condorraptor.glitch.me/"
    : "http://localhost:3001/";

const axiosInstance = axios.create({
  timeout: 5000,
  baseURL: BASE_URL,
});

export async function getAllData(url) {
  const { data } = await axiosInstance.get(url);
  return data;
}
