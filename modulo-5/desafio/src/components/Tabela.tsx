import { IRodadaList, ITeamScore } from "../types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/material";
import { styled } from "@mui/material/styles";
interface ITabelaProps {
  scores: ITeamScore[] | undefined;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[400],
    color: theme.palette.common.black,
    fontWeight: 600,
    fontFamily: "Arial",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function Tabela(props: ITabelaProps) {
  const { scores } = props;
  console.log(scores);

  return (
    <Container maxWidth="md">
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Posição</StyledTableCell>
              <StyledTableCell colSpan={2} align="center">
                Time
              </StyledTableCell>
              <StyledTableCell align="center">P</StyledTableCell>
              <StyledTableCell align="center">V</StyledTableCell>
              <StyledTableCell align="center">E</StyledTableCell>
              <StyledTableCell align="center">D</StyledTableCell>
              <StyledTableCell align="center">GP</StyledTableCell>
              <StyledTableCell align="center">GC</StyledTableCell>
              <StyledTableCell align="center">SG</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {scores?.map((score) => (
              <TableRow
                key={score.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {score.ranking}
                </TableCell>

                <TableCell align="center">
                  <img
                    src={`/img/${score.team_name
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "")
                      .replace(" ", "_")
                      .toLocaleLowerCase()}.png`}
                    width={40}
                    height={40}
                  />
                </TableCell>
                <TableCell align="center">{score.team_name}</TableCell>
                <TableCell align="center">{score.total_score}</TableCell>
                <TableCell align="center">{score.wins}</TableCell>
                <TableCell align="center">{score.draws}</TableCell>
                <TableCell align="center">{score.loses}</TableCell>
                <TableCell align="center">{score.goals_scored}</TableCell>
                <TableCell align="center">{score.goals_taken}</TableCell>
                <TableCell align="center">{score.goals_balance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
