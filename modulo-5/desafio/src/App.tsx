import { useEffect, useState } from "react";
import DataTable from "./components/DataTable";
import { getData } from "./services/api";
import { ITeamScore } from "./types";
import _ from "lodash";
import Header from "./components/Header";
import Input from "./components/Input";
import { extractScores } from "./utils/utils";

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

  return (
    <div className="App">
      <Header />
      <Input year={year} onChange={handleYearChange} />
      <DataTable scores={data} />
    </div>
  );
}

export default App;
