import { ICategoryDespesa, IDespesa } from "../services/api";

function sumDespesas(despesas: IDespesa[]) {
  let sumTotalExpenses: number = 0;
  despesas.map((despesa) => {
    sumTotalExpenses = sumTotalExpenses + despesa.valor;
    return despesa;
  });
  return sumTotalExpenses;
}

function parseAndSortDespesas(despesas: IDespesa[]) {
  despesas.map((despesa) => {
    despesa.dia = +despesa.dia;
    return despesa;
  });

  return despesas.sort((a, b) => a.dia - b.dia);
}

function parseCategories(despesas: IDespesa[]) {
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

export interface IDespesasPageState {
  despesas: IDespesa[];
  totalExpenses: number;
  categories: ICategoryDespesa[];
  year: string;
  month: string;
}

export type IDespesasPageAction =
  | {
      type: "load";
      payload: {
        despesas: IDespesa[];
      };
    }
  | {
      type: "refreshYear";
      payload: {
        year: string;
      };
    }
  | {
      type: "refreshMonth";
      payload: {
        month: string;
      };
    };

export function reducer(
  state: IDespesasPageState,
  action: IDespesasPageAction
): IDespesasPageState {
  switch (action.type) {
    case "load":
      return {
        ...state,
        despesas: parseAndSortDespesas(action.payload.despesas),
        totalExpenses: sumDespesas(action.payload.despesas),
        categories: parseCategories(action.payload.despesas),
      };
    case "refreshYear":
      return { ...state, year: action.payload.year };
    case "refreshMonth":
      return { ...state, month: action.payload.month };

    default:
      return state;
  }
}
