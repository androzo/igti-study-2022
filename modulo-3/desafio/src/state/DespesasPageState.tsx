import { useEffect, useReducer } from "react";
import { reducer } from "../reducers/DespesasPageReducer";
import { getDespesasEndpoint } from "../services/api";
import { toast } from "react-toastify";

export function useDespesasPageState(initYear: string, initMonth: string) {
  const [state, dispatch] = useReducer(reducer, {
    despesas: [],
    totalExpenses: 0,
    categories: [],
    year: initYear,
    month: initMonth,
  });

  const { despesas, totalExpenses, categories, year, month } = state;

  useEffect(() => {
    getDespesasEndpoint(year, month).then((despesas) => {
      dispatch({ type: "load", payload: { despesas } });
      if (despesas.length === 0) {
        popError();
      }
    });
  }, [month, year]);

  return {
    despesas,
    categories,
    totalExpenses,
    year,
    month,
    dispatch,
  };
}

function popError() {
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
