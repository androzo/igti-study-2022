import { useEffect, useState } from "react";
import Tabela from "./components/Tabela";
import { getData } from "./services/api";
import { IRodada, IRodadaList } from "./types";
import _ from "lodash";

function App() {
  const [year, setYear] = useState(2005);
  const [data, setData] = useState<IRodadaList[]>();
  useEffect(() => {
    getData(year).then((response: any) => setData(response.data));
  }, [year]);

  console.log(data);

  return (
    <div className="App">
      Header
      <Tabela last_round={_.last(data)} />
    </div>
  );
}

export default App;
