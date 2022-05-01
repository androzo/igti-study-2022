import Button from "@/components/Button";
import { useEffect, useState } from "react";
import { getDataFromApi, IExchange } from "../../services/api";
import { StyledBox, StyledHeader, StyledTopBody } from "../../styles/styles";
import TextField from "@material-ui/core/TextField";
import { Box } from "@material-ui/core";
import styled from "styled-components";
import Card from "../../components/Card";

const StyledTextField = styled(TextField)`
  margin-left: 10px;
`;

const Home = () => {
  const [data, setData] = useState<IExchange[]>([]);
  const [filteredData, setFilteredData] = useState<IExchange[]>([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    getDataFromApi(pageIndex).then(setData);
  }, [pageIndex]);

  useEffect(() => {
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchText, data]);

  const AnteriorOnClick = () => {
    setSearchText("");
    pageIndex !== 1 ? setPageIndex(pageIndex - 1) : {};
  };

  const ProximoOnClick = () => {
    setSearchText("");
    data.length === 100 ? setPageIndex(pageIndex + 1) : {};
  };

  const filteredMessage = `Mostrando ${filteredData.length} de ${data.length} resultados`;

  return (
    <div>
      <StyledHeader>Desafio Modulo 4</StyledHeader>
      <StyledTopBody>
        <Button name="Anterior" onClick={AnteriorOnClick} />

        <StyledBox>
          <StyledTextField
            id="standard-basic"
            label="Search here"
            value={searchText}
            onChange={(evt) => setSearchText(evt.target.value)}
          />
        </StyledBox>
        <Button name="Próximo" onClick={ProximoOnClick} />
      </StyledTopBody>
      <div>{searchText === "" ? "" : filteredMessage}</div>
      {filteredData?.map((item) => (
        <Card key={item.id} card={item} />
      ))}
    </div>
  );
};

export default Home;
