import { IDespesa } from "../services/api";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 500,
    },
  })
);

export default function DespesasTable(props: { despesas: IDespesa[] }) {
  const { despesas } = props;
  const classes = useStyles();

  return (
    <Box display="div" marginTop={1}>
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
                  {despesa.valor.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
