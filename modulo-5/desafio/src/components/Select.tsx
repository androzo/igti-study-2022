import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import styled from "@emotion/styled";

const YEARS = [
  "2003",
  "2004",
  "2005",
  "2006",
  "2007",
  "2008",
  "2009",
  "2010",
  "2011",
  "2012",
  "2013",
  "2014",
  "2015",
];

const StyledBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 20px;
`;

interface ISelectProps {
  year: string;
  onChange: (event: SelectChangeEvent) => void;
}

export default function SelectBox(props: ISelectProps) {
  const { year, onChange } = props;

  return (
    <StyledBox>
      <Box sx={{ boxShadow: 1, minWidth: 100 }}>
        <FormControl fullWidth>
          <InputLabel id="year-select-label">Ano</InputLabel>
          <Select
            labelId="year-select-label"
            id="year-select"
            value={year}
            label="year"
            onChange={onChange}
          >
            {YEARS.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
            ;
          </Select>
        </FormControl>
      </Box>
    </StyledBox>
  );
}
