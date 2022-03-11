import "./App.css";
import DespesasPage from "./pages/DespesasPage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { getUserEndpoint, IUser, signOutEndpoint } from "./services/api";
import { useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage";

function App() {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    getUserEndpoint().then(setUser, () => setUser(null));
  }, []);

  function signOut() {
    signOutEndpoint();
    setUser(null);
  }

  if (user) {
    return (
      <Router>
        <Switch>
          <Route path="/despesas/:year-:month">
            <DespesasPage user={user} onSignOut={signOut}></DespesasPage>
          </Route>
          <Redirect to={{ pathname: "/despesas/2020-06" }}></Redirect>
        </Switch>
      </Router>
    );
  } else {
    return <LoginPage onSignIn={setUser} />;
  }
}

export default App;
