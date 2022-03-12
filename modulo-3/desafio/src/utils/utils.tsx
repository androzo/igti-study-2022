import { ICategoryDespesa, IDespesa } from "../services/api";
import { toast } from "react-toastify";

export function popError() {
  return toast.error(
    "Nenhuma despesa encontrada para esta data! Tente outra data",
    {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    }
  );
}
export const MONTHS = [
  { text: "Janeiro", value: "01" },
  { text: "Fevereiro", value: "02" },
  { text: "Março", value: "03" },
  { text: "Abril", value: "04" },
  { text: "Maio", value: "05" },
  { text: "Junho", value: "06" },
  { text: "Julho", value: "07" },
  { text: "Agosto", value: "08" },
  { text: "Setembro", value: "09" },
  { text: "Outubro", value: "10" },
  { text: "Novembro", value: "11" },
  { text: "Dezembro", value: "12" },
];

export const YEARS = ["2020", "2021"];

export function getToday() {
  let a: Date = new Date();
  let month: string = a.getMonth().toString().padStart(2, "0");
  let year: string = a.getFullYear().toString();
  return `${year}-${month}`;
}

export function sumDespesas(despesas: IDespesa[]) {
  let sumTotalExpenses: number = 0;
  despesas.map((despesa) => {
    sumTotalExpenses = sumTotalExpenses + despesa.valor;
    return despesa;
  });
  return sumTotalExpenses;
}

export function parseAndSortDespesas(despesas: IDespesa[]) {
  despesas.map((despesa) => {
    despesa.dia = +despesa.dia;
    return despesa;
  });

  return despesas.sort((a, b) => a.dia - b.dia);
}

export function parseCategories(despesas: IDespesa[]) {
  const categorizedDespesas: ICategoryDespesa[] = [];
  const categories = [
    ...Array.from(new Set(despesas.map((despesa) => despesa.categoria))),
  ];

  for (let i = 0; i < categories.length; i++) {
    categorizedDespesas.push({ id: i, name: categories[i], total: 0 });
  }

  despesas.map((despesa) => {
    categorizedDespesas.map((categories) => {
      if (despesa.categoria === categories.name) {
        categories.total = categories.total + despesa.valor;
      }
      return categories;
    });
    return despesa;
  });

  return categorizedDespesas.sort((a, b) => a.name.localeCompare(b.name));
}
