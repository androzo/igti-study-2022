import { useEffect, useState, ChangeEvent } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { getDespesasEndpoint, IDespesa } from "../services/backend";
import { MONTHS, YEARS } from "../dateFunctions";
import Container from "@material-ui/core/Container";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    table: {
      minWidth: 500,
    },
  })
);

export default function DespesasPage() {
  const params = useParams<{ year: string; month: string }>();
  const [despesas, setDespesas] = useState<IDespesa[] | null>(null);
  const [year, setYear] = useState(params.year);
  const [month, setMonth] = useState(params.month);
  const [totalExpenses, setTotalExpenses] = useState<number | null>(null);

  function popError() {
    return toast.error(
      "Nenhuma despesa encontrada para esta data! Tente outra data",
      {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  }

  function updateDespesas() {
    let sumTotalExpenses: number = 0;
    getDespesasEndpoint(year, month).then((response) => {
      response.map((despesa) => {
        sumTotalExpenses = sumTotalExpenses + despesa.valor;
        despesa.dia = +despesa.dia;
      });
      setDespesas(response.sort((a, b) => a.dia - b.dia));
      setTotalExpenses(sumTotalExpenses);

      if (response.length == 0) {
        popError();
      }
    });
  }

  useEffect(() => {
    updateDespesas();
  }, [month, year]);

  const handleYearChange = (event: ChangeEvent<{ value: unknown }>) => {
    setYear(event.target.value as string);
    return <Link to={`${event.target.value as string}-${month}`}></Link>;
  };

  const handleMonthChange = (event: ChangeEvent<{ value: unknown }>) => {
    setMonth(event.target.value as string);
    return <Link to={`${year}-${event.target.value as string}`}></Link>;
  };

  const classes = useStyles();
  return (
    <div>
      <Container component="div" maxWidth="sm">
        <FormControl className={classes.formControl}>
          <InputLabel id="yearLabel">Year</InputLabel>
          <Select
            labelId="yearLabel"
            id="yearId"
            value={year}
            onChange={handleYearChange}
          >
            {YEARS.map((item) => {
              return (
                <MenuItem value={item} key={item}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="monthLabel">Month</InputLabel>
          <Select
            labelId="monthLabel"
            id="labelId"
            value={month}
            onChange={handleMonthChange}
          >
            {MONTHS.map((item) => {
              return (
                <MenuItem value={item.value} key={item.value}>
                  {item.text}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Container>
      <Container component="div" maxWidth="sm">
        Despesa total:
        <strong> R$ {totalExpenses?.toFixed(2).replace(".", ",")}</strong>
      </Container>
      <Container component="div" maxWidth="md">
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size="medium"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Despesas</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Categoria</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Dia</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Valor</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {despesas?.map((despesa) => (
                <TableRow key={despesa.id}>
                  <TableCell component="th" scope="row">
                    {despesa.descricao}
                  </TableCell>
                  <TableCell align="center">{despesa.categoria}</TableCell>
                  <TableCell align="center">{despesa.dia}</TableCell>
                  <TableCell align="right">
                    R$ {despesa.valor.toFixed(2).replace(".", ",")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <ToastContainer
        position="bottom-center"
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
