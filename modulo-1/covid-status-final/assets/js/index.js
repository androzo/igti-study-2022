import { getCountries, getSummary } from "./covidApi.js";

const countries = await getCountries();
const summary = await getSummary();

// tentar fazer assim pra mapear e ordenar grafico de barras
let countriesSorted = _.orderBy(
  countries,
  ["TotalDeaths", "Country"],
  ["desc", "asc"]
);
countriesSorted = countriesSorted.slice(0, 10);
console.log(countriesSorted);

// aaaa

const summaryTotals = {
  confirmed: summary.Global.TotalConfirmed,
  death: summary.Global.TotalDeaths,
  recovered: summary.Global.TotalRecovered,
  newConfirmed: summary.Global.NewConfirmed,
  newDeaths: summary.Global.NewDeaths,
  newRecovered: summary.Global.NewRecovered,
};
let top10ByCountry = sortTotalByCountry(summary.Countries).slice(0, 10);

document.getElementById("confirmed").innerHTML =
  summaryTotals.confirmed.toLocaleString("PT");
document.getElementById("death").innerHTML =
  summaryTotals.death.toLocaleString("PT");
document.getElementById("recovered").innerHTML =
  summaryTotals.recovered.toLocaleString("PT");
document.getElementById("date").innerHTML = summary.Global.Date;

function sortTotalByCountry(obj) {
  obj.sort((a, b) => {
    return (
      (a.TotalDeaths === null) - (b.TotalDeaths === null) ||
      -(a.TotalDeaths > b.TotalDeaths) ||
      +(a.TotalDeaths < b.TotalDeaths)
    );
  });
  return obj;
}

let novosCasos = new Chart(document.getElementById("pizza"), {
  type: "pie",
  data: {
    labels: ["Confirmados", "Recuperados", "Mortes"],
    datasets: [
      {
        data: [
          summaryTotals.newConfirmed,
          summaryTotals.newRecovered,
          summaryTotals.newDeaths,
        ],
        backgroundColor: ["#3e95cd", "#3c8523", "#42F39f"],
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Distribuição de novos casos",
      },
    },
  },
});

let deathByCountry = new Chart(document.getElementById("barras"), {
  type: "bar",
  data: {
    labels: top10ByCountry.map((item) => item.Country),
    datasets: [
      {
        label: "Realizado",
        data: top10ByCountry.map((item) => item.TotalDeaths),
        backgroundColor: "#0F0F0F",
      },
    ],
  },
  options: {
    reponsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Total de Mortes por país - Top 10",
      },
    },
  },
});
