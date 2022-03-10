import "./App.css";
import DespesasPage from "./pages/DespesasPage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { getUserEndpoint } from "./services/api";
import { useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage";

function App() {
  const [hasSession, setHasSession] = useState(false);
  useEffect(() => {
    getUserEndpoint().then(
      () => setHasSession(true),
      () => setHasSession(false)
    );
  }, []);

  if (hasSession) {
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
  } else {
    return <LoginPage />;
  }
}

export default App;
