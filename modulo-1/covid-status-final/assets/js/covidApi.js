const covidApi = axios.create({
  baseURL: "https://api.covid19api.com/",
});

async function getCountries() {
  let res = await covidApi.get("countries");
  return res.data;
}

async function getSummary() {
  let res = await covidApi.get("summary");
  return res.data;
}

async function getStatusByCountry(country, from, to) {
  let url = `country/${country}?from=${from}&to=${to}`;
  console.log(url);
  let res = await covidApi.get(url);
  return res.data;
}

export { getCountries, getSummary, getStatusByCountry };
