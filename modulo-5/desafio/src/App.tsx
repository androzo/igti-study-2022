import { useEffect, useState } from "react";
import Tabela from "./components/Tabela";
import { getData } from "./services/api";
import { IRodadaList, ITeamScore } from "./types";
import _ from "lodash";
import Header from "./components/Header";
import SelectBox from "./components/Select";
import { extractScores } from "./utils/utils";
import { SelectChangeEvent } from "@mui/material";

function App() {
  const [year, setYear] = useState("2003");
  const [data, setData] = useState<ITeamScore[]>();
  useEffect(() => {
    getData(year).then((response: any) =>
      setData(extractScores(_.last(response.data)))
    );
  }, [year]);

  const handleYearChange = (event: SelectChangeEvent) => {
    setYear(event.target.value as string);
  };

  return (
    <div className="App">
      <Header />
      <SelectBox year={year} onChange={handleYearChange} />
      <Tabela scores={data} />
    </div>
  );
}

export default App;
