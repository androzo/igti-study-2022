import * as React from "react";
import Box from "@mui/material/Box";
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
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function SelectBox(props: ISelectProps) {
  const { year, onChange } = props;

  return (
    <StyledBox>
      <label htmlFor="year-select">Ano:</label>

      <select name="year-select" id="year-select" onChange={onChange}>
        {YEARS.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </StyledBox>
  );
}
