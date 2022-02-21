import axios from "axios";
import { getNewId } from "./idService";

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

export async function postData(url, newData) {
  const { data } = await axiosInstance.post(url, {
    id: getNewId(),
    ...newData,
  });

  return data;
}

export async function updateData(url, newData) {
  const { data } = await axiosInstance.put(url, {
    ...newData,
  });

  return data;
}

export async function deleteData(url) {
  await axiosInstance.delete(url);
}
