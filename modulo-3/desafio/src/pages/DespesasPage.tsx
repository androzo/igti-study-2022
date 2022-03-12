import Container from "@material-ui/core/Container";
import { useEffect, useReducer, useState } from "react";
import { getDespesasEndpoint, IDespesa } from "../services/api";
import { useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DespesasSelect from "../components/DespesasSelect";
import { Link } from "react-router-dom";
import DespesasHeader from "../components/DespesasHeader";
import DespesasTab from "../components/DespesasTab";

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

interface IDespesasPageState {
  despesas: IDespesa[];
  totalExpenses: number;
  year: string;
  month: string;
}

type IDespesasPageAction =
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

function reducer(
  state: IDespesasPageState,
  action: IDespesasPageAction
): IDespesasPageState {
  switch (action.type) {
    case "load":
      return {
        ...state,
        despesas: parseAndSortDespesas(action.payload.despesas),
        totalExpenses: sumDespesas(action.payload.despesas),
      };
    case "refreshYear":
      return { ...state, year: action.payload.year };
    case "refreshMonth":
      return { ...state, month: action.payload.month };

    default:
      return state;
  }
}

export default function DespesasPage() {
  const params = useParams<{ year: string; month: string }>();

  const [state, dispatch] = useReducer(reducer, {
    despesas: [],
    totalExpenses: 0,
    year: params.year,
    month: params.month,
  });

  const { despesas, totalExpenses, year, month } = state;

  const onYearChange = (year: string) => {
    dispatch({ type: "refreshYear", payload: { year } });
    return <Link to={`${year}-${month}`}></Link>;
  };

  const onMonthChange = (month: string) => {
    dispatch({ type: "refreshMonth", payload: { month } });
    return <Link to={`${year}-${month}`}></Link>;
  };

  useEffect(() => {
    getDespesasEndpoint(year, month).then((despesas) => {
      dispatch({ type: "load", payload: { despesas } });
      if (despesas.length === 0) {
        popError();
      }
    });
  }, [month, year]);

  return (
    <div>
      <Container component="div" maxWidth="md">
        <DespesasHeader />
      </Container>
      <Container component="div" maxWidth="md">
        <DespesasSelect
          month={month}
          year={year}
          totalExpenses={totalExpenses}
          onYearChange={onYearChange}
          onMonthChange={onMonthChange}
        />
      </Container>
      <Container component="div" maxWidth="md">
        <DespesasTab despesas={despesas} />
      </Container>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
