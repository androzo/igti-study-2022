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

export const YEARS = ["2020", "2021", "2022"];

export function getToday() {
  let a: Date = new Date();
  let month: string = a.getMonth().toString().padStart(2, "0");
  let year: string = a.getFullYear().toString();
  return `${year}-${month}`;
}

export function formatMonth(isoMonth: string) {
  const [year, month] = isoMonth.split("-");
  return `${MONTHS[parseInt(month) - 1]} de ${year}`;
}

export function addMonths(month: string, increment: number) {
  const jsDate = new Date(month + "-01T12:00:00");
  jsDate.setMonth(jsDate.getMonth() + increment);
  return `${jsDate.getFullYear()}-${(jsDate.getMonth() + 1)
    .toString()
    .padStart(2, "0")}`;
}
