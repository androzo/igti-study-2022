import { Box } from "@mui/material";
import styled from "@emotion/styled";

const StyledBox = styled(Box)`
  background-color: lightgray;
  text-align: center;
  padding: 20px;
  font-size: x-large;
  font-family: sans-serif;
  font-weight: 500;
  border: solid 1px;
  border-radius: 10px;
  box-shadow: 5px 5px 2px grey;
`;

export default function Header() {
  return <StyledBox>desafio-final</StyledBox>;
}
