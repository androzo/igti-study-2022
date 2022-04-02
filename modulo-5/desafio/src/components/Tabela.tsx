import { IRodadaList, ITeamScore } from "../types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

interface ITabelaProps {
  scores: ITeamScore[] | undefined;
}

export default function Tabela(props: ITabelaProps) {
  const { scores } = props;
  console.log(scores);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Posição</TableCell>
            <TableCell align="right">Time</TableCell>
            <TableCell align="right">P</TableCell>
            <TableCell align="right">V</TableCell>
            <TableCell align="right">E</TableCell>
            <TableCell align="right">D</TableCell>
            <TableCell align="right">GP</TableCell>
            <TableCell align="right">GC</TableCell>
            <TableCell align="right">`</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {scores?.map((score) => (
            <TableRow
              key={score.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {score.ranking}
              </TableCell>
              <TableCell align="right">{score.team_name}</TableCell>
              <TableCell align="right">{score.total_score}</TableCell>
              <TableCell align="right">{score.wins}</TableCell>
              <TableCell align="right">{score.draws}</TableCell>
              <TableCell align="right">{score.loses}</TableCell>
              <TableCell align="right">{score.goals_scored}</TableCell>
              <TableCell align="right">{score.goals_taken}</TableCell>
              <TableCell align="right">{score.goals_balance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
