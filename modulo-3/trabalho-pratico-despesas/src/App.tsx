import "./App.css";
import DespesasPage from "./pages/DespesasPage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { getToday } from "./dateFunctions";

function App() {
  const initialDate: string = getToday();
  const year: string = initialDate.split("-")[0];
  const month: string = initialDate.split("-")[1];
  return (
    <Router>
      <Switch>
        <Route path="/despesas/:year-:month">
          <DespesasPage></DespesasPage>
        </Route>
        <Redirect
          to={{ pathname: "/despesas/" + year + "-" + month }}
        ></Redirect>
      </Switch>
    </Router>
  );
  // return (
  //   <div className="App">
  //     <DespesasPage></DespesasPage>
  //   </div>
  // );
}

export default App;
