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

interface ISelectProps {
  year: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const StyledBox = styled(Box)`
  text-align: center;
  display: block;
  align-items: center;
  justify-content: center;
  padding: 10px;
  font-size: medium;
  font-family: sans-serif;
  font-weight: 500;
`;

const StyledSelect = styled.select`
  position: relative;
  font-family: Arial;
  font-size: medium;
  background-color: lightgrey;
  border: none;
  border-radius: 20px;
  box-shadow: 5px 5px 2px grey;
  padding: 5px;

  :hover {
    border: none;
    border-radius: 20px;
  }
  :selection {
    border: none;
  }
`;

const StyledH1 = styled.h1`
  text-shadow: 1px 1px 2px grey;
  text-align: center;
  display: block;
  font-size: x-large;
  font-family: sans-serif;
  font-weight: 500;
`;

export default function SelectBox(props: ISelectProps) {
  const { year, onChange } = props;

  return (
    <StyledBox>
      <StyledH1>Campeonato Brasileiro de {year}</StyledH1>

      <StyledBox>
        <label htmlFor="year-select">Selecione o ano: </label>

        <StyledSelect name="year-select" id="year-select" onChange={onChange}>
          {YEARS.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </StyledSelect>
      </StyledBox>
    </StyledBox>
  );
}
