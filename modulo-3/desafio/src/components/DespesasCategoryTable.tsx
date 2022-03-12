import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

import { ICategoryDespesa } from "../services/api";

interface IDespesasCategoryTableProps {
  categories: ICategoryDespesa[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 500,
    },
  })
);

export default function DespesasCategoryTable(
  props: IDespesasCategoryTableProps
) {
  const { categories } = props;

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
                <strong>Categoria</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Valor</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories?.map((category) => (
              <TableRow key={category.id}>
                <TableCell component="th" scope="row">
                  {category.name}
                </TableCell>
                <TableCell align="right">
                  {category.total.toLocaleString("pt-br", {
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
