import "./App.css";
import DespesasPage from "./pages/DespesasPage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/despesas/:year-:month">
          <DespesasPage></DespesasPage>
        </Route>
        <Redirect to={{ pathname: "/despesas/2020-06" }}></Redirect>
      </Switch>
    </Router>
  );
}

export default App;
