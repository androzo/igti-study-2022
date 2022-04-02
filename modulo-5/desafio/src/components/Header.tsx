import { Box } from "@mui/material";
import styled from "@emotion/styled";

const StyledBox = styled(Box)`
  background-color: lightgray;
  text-align: center;
  padding: 20px;
  font-size: large;
  font-family: sans-serif;
  font-weight: 500;
`;

export default function Header() {
  return <StyledBox>desafio-final</StyledBox>;
}
