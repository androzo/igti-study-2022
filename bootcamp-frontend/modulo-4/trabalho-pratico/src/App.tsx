import styled from "styled-components";
import { Header } from "./components/Header";

fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((json) => console.log(json));

const StyledDiv = styled.div`
  padding: 10px;
  text-align: center;
  font-family: sans-serif;
  font-size: 25px;
`;

function App() {
  return (
    <>
      <Header></Header>
      <StyledDiv>Teste</StyledDiv>
    </>
  );
}

export default App;
