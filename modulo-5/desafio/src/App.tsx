import { useEffect, useState } from "react";
import DataTable from "./components/DataTable";
import { getData } from "./services/api";
import { ITeamScore } from "./types";
import _ from "lodash";
import Header from "./components/Header";
import Input from "./components/Input";
import { extractScores } from "./utils/utils";
import styled from "@emotion/styled";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { textAlign } from "@mui/system";

const StyledTaylorHawkins = styled.div`
  display: flex;
  justify-content: center;
  opacity: 0.5;
  padding: 20px;
`;

function App() {
  const [year, setYear] = useState("2003");
  const [data, setData] = useState<ITeamScore[]>();
  useEffect(() => {
    getData(year).then((response: any) =>
      setData(extractScores(_.last(response.data)))
    );
  }, [year]);

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(event.target.value as string);
  };

  const loading = (
    <Box sx={{ display: "block", justifyItems: "center", textAlign: "center" }}>
      Loading
      <CircularProgress />
    </Box>
  );

  return (
    <div className="App">
      <Header />
      <Input year={year} onChange={handleYearChange} />
      {data ? <DataTable scores={data} /> : loading}
    </div>
  );
}

export default App;
