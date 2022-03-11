import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Box from "@material-ui/core/Box";
import { MONTHS, YEARS } from "../dateFunctions";
import { ChangeEvent } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      float: "left",
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

interface IDespesasSelectProps {
  year: string;
  month: string;
  totalExpenses: number;
  onYearChange: (value: string) => void;
  onMonthChange: (value: string) => void;
}

export default function DespesasSelect(props: IDespesasSelectProps) {
  const { year, month, totalExpenses, onYearChange, onMonthChange } = props;

  const handleYearChange = (e: ChangeEvent<{ value: unknown }>) => {
    onYearChange(e.target.value as string);
  };

  const handleMonthChange = (e: ChangeEvent<{ value: unknown }>) => {
    onMonthChange(e.target.value as string);
  };

  const classes = useStyles();
  return (
    <Box display="flex" justifyContent={"space-between"} alignItems="center">
      <Box>
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
      </Box>
      <Box>
        Despesa total:{" "}
        {totalExpenses?.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        })}
      </Box>
    </Box>
  );
}
