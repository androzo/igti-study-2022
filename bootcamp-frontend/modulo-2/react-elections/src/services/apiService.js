import { getAllData } from "./httpService";

export async function apiGetAllCities() {
  const allCities = await getAllData("/cities");
  return [...allCities];
}

export async function apiGetElection(cityId) {
  const election = await getAllData(`/election?cityId=${cityId}`);
  return [...election];
}

export async function apiGetAllCandidates() {
  const allCandidates = await getAllData("/candidates");
  return [...allCandidates];
}
