import Button from "@/components/Button";
import { useEffect, useState } from "react";
import { getDataFromApi, IExchange } from "../../services/api";
import { StyledBox, StyledHeader, StyledHeaderBox } from "../../styles/styles";
import TextField from "@material-ui/core/TextField";
import { Box } from "@material-ui/core";
import styled from "styled-components";
import Card from "../../components/Card";

// export async function getServerSideProps() {
//   const data = await fetch(
//     `${COINGECKO_BASE_URL}?per_page=${ITEMS_PER_PAGE}&page=1`
//   ).then((resp) => resp.json());

//   return {
//     props: { data },
//   };
// }

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

  return (
    <div>
      <StyledHeader>Desafio Modulo 4</StyledHeader>
      <span>
        <Button name="Anterior" onClick={AnteriorOnClick} />
      </span>
      <StyledHeaderBox>
        <StyledTextField
          id="standard-basic"
          label="Search here"
          value={searchText}
          onChange={(evt) => setSearchText(evt.target.value)}
        />
      </StyledHeaderBox>
      <span>
        <Button name="Próximo" onClick={ProximoOnClick} />
      </span>

      <ul>
        {filteredData?.map((item) => (
          <Card key={item.id} card={item} />
        ))}
      </ul>
    </div>
  );
};

export default Home;
