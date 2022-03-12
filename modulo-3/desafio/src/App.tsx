import "./App.css";
import DespesasPage from "./pages/DespesasPage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { getUserEndpoint, IUser, signOutEndpoint } from "./services/api";
import React, { useEffect, useState } from "react";
import { authContext } from "./authContext";
import LoginPage from "./pages/LoginPage";

function App() {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    getUserEndpoint().then(setUser, () => setUser(null));
  }, []);

  function onSignOut() {
    signOutEndpoint();
    setUser(null);
  }

  if (user) {
    return (
      <authContext.Provider value={{ user, onSignOut }}>
        <Router>
          <Switch>
            <Route path="/despesas/:year-:month">
              <DespesasPage />
            </Route>
            <Redirect to={{ pathname: "/despesas/2020-06" }}></Redirect>
          </Switch>
        </Router>
      </authContext.Provider>
    );
  } else {
    return <LoginPage onSignIn={setUser} />;
  }
}

class App2 extends React.Component<{}, { user: IUser | null }> {
  constructor(props: {}) {
    super(props);
    this.state = {
      user: null,
    };
  }

  render() {
    const { user } = this.state;

    const setUser = (user: IUser) => {
      this.setState({ user });
    };

    const onSignOut = () => {
      signOutEndpoint();
      this.setState({ user: null });
    };

    if (user) {
      return (
        <authContext.Provider value={{ user, onSignOut }}>
          <Router>
            <Switch>
              <Route path="/despesas/:year-:month">
                <DespesasPage />
              </Route>
              <Redirect to={{ pathname: "/despesas/2020-06" }}></Redirect>
            </Switch>
          </Router>
        </authContext.Provider>
      );
    } else {
      return <LoginPage onSignIn={setUser} />;
    }
  }

  componentDidMount() {
    getUserEndpoint().then(
      (response) => this.setState({ user: response }),
      () => this.setState({ user: null })
    );
  }
}

export default App;
