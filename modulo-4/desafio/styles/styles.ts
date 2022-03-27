import styled from "styled-components";

export const StyledHeader = styled.h1`
  text-align: center;
`;

export const StyledBox = styled.div`
  display: inline-block;
`;

export const StyledHeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StyledDivTable = styled.div`
  display: table;
  width: 350px;
  height: 150px;
  table-layout: fixed;
  margin: 10px;
  padding: 10px;
  background-color: #d3d6d6;
  border: outset 2px;
  border-radius: 10px;
`;

export const StyledDivRow = styled.div`
  display: table-row;
`;

export const StyledButton = styled.button`
  background-color: lightgrey;
  margin: 10px;
  color: black;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 7px 14px;
  &:hover {
    background-color: #5469d4;
  }
`;
