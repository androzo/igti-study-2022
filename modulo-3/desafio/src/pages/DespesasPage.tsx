import Container from "@material-ui/core/Container";
import { useParams } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DespesasSelect from "../components/DespesasSelect";
import { Link } from "react-router-dom";
import DespesasHeader from "../components/DespesasHeader";
import DespesasTab from "../components/DespesasTab";
import { useAppDispatch, useAppSelector } from "../hooks";
import { popError } from "../utils/utils";
import { getDespesasEndpoint } from "../services/api";
import { useEffect } from "react";
import { load, refreshMonth, refreshYear } from "../slices/despesaSlice";

export default function DespesasPage() {
  const { despesas, categories, totalExpenses, year, month } = useAppSelector(
    (state) => state.despesas
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    getDespesasEndpoint(year, month).then((response) => {
      dispatch(load(response));
      if (response.length === 0) {
        popError();
      }
    });
  }, [month, year]);

  const onYearChange = (year: string) => {
    dispatch(refreshYear(year));
    return <Link to={`${year}-${month}`}></Link>;
  };

  const onMonthChange = (month: string) => {
    dispatch(refreshMonth(month));
    return <Link to={`${year}-${month}`}></Link>;
  };
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
        <DespesasTab despesas={despesas} categories={categories} />
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
