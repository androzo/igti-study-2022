import Container from "@material-ui/core/Container";
import { useParams } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DespesasSelect from "../components/DespesasSelect";
import { Link } from "react-router-dom";
import DespesasHeader from "../components/DespesasHeader";
import DespesasTab from "../components/DespesasTab";
import { useDespesasPageState } from "../state/DespesasPageState";

export default function DespesasPage() {
  const params = useParams<{ year: string; month: string }>();

  const { despesas, categories, totalExpenses, year, month, dispatch } =
    useDespesasPageState(params.year, params.month);

  const onYearChange = (year: string) => {
    dispatch({ type: "refreshYear", payload: { year } });
    return <Link to={`${year}-${month}`}></Link>;
  };

  const onMonthChange = (month: string) => {
    dispatch({ type: "refreshMonth", payload: { month } });
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
