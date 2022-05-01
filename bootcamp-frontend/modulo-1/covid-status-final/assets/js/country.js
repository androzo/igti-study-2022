import { getCountries, getStatusByCountry } from "./covidApi.js";

const countries = await getCountries();
const labelKpiconfirmed = document.getElementById("kpiconfirmed");
const labelKpideaths = document.getElementById("kpideaths");
const labelKpirecovered = document.getElementById("kpirecovered");
const countryComboElement = document.getElementById("cmbCountry");
const dataComboElement = document.getElementById("cmbData");
const startDateElement = document.getElementById("date_start");
const endDateElement = document.getElementById("date_end");
const submitButton = document.getElementById("filtro");
let countryComboArray = [];
let today = new Date();
today = dateFns.format(today, "YYYY-MM-DD");

submitButton.addEventListener("click", loadData);
startDateElement.setAttribute("max", today);
endDateElement.setAttribute("max", today);

let linhas = new Chart(document.getElementById("linhas"), {
  type: "line",
  data: {
    datasets: [
      {
        data: [],
        label: "",
        borderColor: "rgb(60,186,159)",
        backgroundColor: "rgb(60,186,159,0.1)",
      },
      {
        data: [],
        label: "",
        borderColor: "rgb(255,140,13)",
        backgroundColor: "rgb(255,140,13, 0.1)",
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "left", //top, bottom, left, rigth
      },
      title: {
        display: true,
        text: "Curva de Covid",
      },
      layout: {
        padding: {
          left: 100,
          right: 100,
          top: 50,
          bottom: 10,
        },
      },
    },
  },
});

function parseLinhasChart(response) {
  linhas.data.datasets[0].data = [];
  linhas.data.datasets[1].data = [];
  linhas.data.datasets[0].label = [];
  linhas.data.datasets[1].label = [];

  linhas.data.labels = [];
  linhas.update();

  const previousDay = response.shift();
  let totalDeaths = 0;
  let totalConfirmed = 0;
  let totalRecovered = 0;
  console.log(response);

  response.map((item, index) => {
    if (index == 0) {
      totalDeaths = item.Deaths - previousDay.Deaths;
      totalConfirmed = item.Confirmed - previousDay.Confirmed;
      totalRecovered = item.Recovered - previousDay.Recovered;
    } else {
      totalDeaths = totalDeaths + (item.Deaths - response[index - 1].Deaths);
      totalConfirmed =
        totalConfirmed + (item.Confirmed - response[index - 1].Confirmed);
      totalRecovered =
        totalRecovered + (item.Recovered - response[index - 1].Recovered);
    }
  });
  labelKpiconfirmed.innerHTML = totalConfirmed;
  labelKpideaths.innerHTML = totalDeaths;
  labelKpirecovered.innerHTML = totalRecovered;

  let totalDeathsAvg = totalDeaths / response.length;
  let totalConfirmedAvg = totalConfirmed / response.length;
  let totalRecoveredAvg = totalRecovered / response.length;
  switch (dataComboElement.value) {
    case "Deaths": {
      response.map((item, index) => {
        let total;
        if (index == 0) {
          total = item.Deaths - previousDay.Deaths;
        } else {
          total = item.Deaths - response[index - 1].Deaths;
        }
        let date = Date.parse(item.Date.replace("Z", ""));
        date = dateFns.format(date, "YYYY-MM-DD");
        linhas.data.labels.push(date);
        linhas.data.datasets[0].data.push(total);
        linhas.data.datasets[1].data.push(parseInt(totalDeathsAvg));
        linhas.data.datasets[0].label = "Total de mortes";
        linhas.data.datasets[1].label = "Média de mortes";

        linhas.update();
      });
      break;
    }
    case "Confirmed": {
      response.map((item, index) => {
        let total;
        if (index == 0) {
          total = item.Confirmed - previousDay.Confirmed;
        } else {
          total = item.Confirmed - response[index - 1].Confirmed;
        }
        let date = Date.parse(item.Date.replace("Z", ""));
        date = dateFns.format(date, "YYYY-MM-DD");
        linhas.data.labels.push(date);
        linhas.data.datasets[0].data.push(total);
        linhas.data.datasets[1].data.push(parseInt(totalConfirmedAvg));
        linhas.data.datasets[0].label = "Total de casos";
        linhas.data.datasets[1].label = "Média de casos";

        linhas.update();
      });
      break;
    }
    case "Recovered": {
      response.map((item, index) => {
        let total;
        if (index == 0) {
          total = item.Recovered - previousDay.Recovered;
        } else {
          total = item.Recovered - response[index - 1].Recovered;
        }
        let date = Date.parse(item.Date.replace("Z", ""));
        date = dateFns.format(date, "YYYY-MM-DD");
        linhas.data.labels.push(date);
        linhas.data.datasets[0].data.push(total);
        linhas.data.datasets[1].data.push(parseInt(totalRecoveredAvg));
        linhas.data.datasets[0].label = "Total de recuperados";
        linhas.data.datasets[1].label = "Média de recuperados";

        linhas.update();
      });
      break;
    }

    default:
      console.log("Not found");
  }
}

async function loadData() {
  let startDate = new Date(startDateElement.value).toISOString();
  startDate = dateFns.addDays(startDate, -1);
  let endDate = new Date(endDateElement.value).toISOString();
  let today = new Date().toISOString();
  if (endDate < startDate) {
    alert(
      "End date must be greater than start date and not greater than today"
    );
    return;
  } else if (endDate > today) {
    alert("End date can't be in future");
    return;
  }
  let res = await getStatusByCountry(
    countryComboElement.value,
    startDate,
    endDate
  );

  parseLinhasChart(res);
}
countryComboArray = countries.map((item) => `${item.Slug}>${item.Country}`);
loadComboOptions(countryComboElement, countryComboArray.sort());

function loadComboOptions(element, values) {
  values.map((item) =>
    element.insertAdjacentHTML("beforeend", `<option value=${item}</option>`)
  );
  countryComboElement.selectedIndex =
    countryComboArray.indexOf("brazil>Brazil");
}
