import { ITeamScore } from "../types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/material";
import { styled as StyledMUI } from "@mui/material/styles";
import styled from "@emotion/styled";

const StyledTableCell = StyledMUI(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[400],
    color: theme.palette.common.black,
    fontWeight: 600,
    fontSize: 16,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 20,
  },
}));

const StyledTableContainer = StyledMUI(TableContainer)`
  box-shadow: 5px 5px 2px grey;
`;

const StyledTableRow = StyledMUI(TableRow)`
  &:nth-of-type(odd) {
    background-color: #e2dddd;
  }

  &:nth-of-type(even) {
    background-color: #eeecec;
  }
`;

const StyledImg = styled.img`
  border-radius: 70%;
`;

interface ITabelaProps {
  scores: ITeamScore[] | undefined;
}

export default function Tabela(props: ITabelaProps) {
  const { scores } = props;

  return (
    <Container maxWidth="md">
      <StyledTableContainer component={Paper}>
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
              <StyledTableRow
                key={score.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {score.ranking}
                </TableCell>

                <TableCell align="center">
                  <StyledImg
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
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </Container>
  );
}
