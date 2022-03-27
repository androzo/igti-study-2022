import Button from "@/components/Button";
import { useEffect, useState } from "react";
import {
  COINGECKO_BASE_URL,
  getDataFromApi,
  IExchange,
  ITEMS_PER_PAGE,
} from "../services/api";
import { StyledHeader } from "./styles";
import TextField from "@material-ui/core/TextField";
import { Box } from "@material-ui/core";
import styled from "styled-components";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

export async function getServerSideProps() {
  const data = await fetch(
    `${COINGECKO_BASE_URL}?per_page=${ITEMS_PER_PAGE}&page=1`
  ).then((resp) => resp.json());

  return {
    props: { data },
  };
}

const StyledTextField = styled(TextField)`
  margin-left: 10px;
`;

const Home = (props: any) => {
  const [data, setData] = useState<IExchange[]>(props.data);
  const [filteredData, setFilteredData] = useState<IExchange[]>([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [searchText, setSearchText] = useState("");

  // useEffect(() => {
  //   getDataFromApi(pageIndex).then(setData);
  // }, [pageIndex]);

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

  return (
    <div>
      <StyledHeader>Desafio Modulo 4</StyledHeader>

      <Button name="Anterior" onClick={AnteriorOnClick} />
      <Button name="Próximo" onClick={ProximoOnClick} />
      <Box>
        <StyledTextField
          id="standard-basic"
          label="Search here"
          value={searchText}
          onChange={(evt) => setSearchText(evt.target.value)}
        />
      </Box>
      <ul>
        {data?.map((item: any) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
