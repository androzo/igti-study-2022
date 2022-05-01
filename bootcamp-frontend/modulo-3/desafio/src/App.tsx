import "./App.css";
import DespesasPage from "./pages/DespesasPage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { getUserEndpoint, IUser, signOutEndpoint } from "./services/api";
import React from "react";
import { authContext } from "./authContext";
import LoginPage from "./pages/LoginPage";
import { store } from "./store";
import { Provider } from "react-redux";

class App extends React.Component<{}, { user: IUser | null }> {
  setUser: (user: IUser) => void;
  onSignOut: () => void;

  constructor(props: {}) {
    super(props);
    this.state = {
      user: null,
    };

    this.setUser = (user: IUser) => {
      this.setState({ user });
    };

    this.onSignOut = () => {
      signOutEndpoint();
      this.setState({ user: null });
    };
  }
  render() {
    const { user } = this.state;

    if (user) {
      return (
        <Provider store={store}>
          <authContext.Provider value={{ user, onSignOut: this.onSignOut }}>
            <Router>
              <Switch>
                <Route path="/despesas/:year-:month">
                  <DespesasPage />
                </Route>
                <Redirect to={{ pathname: "/despesas/2020-06" }}></Redirect>
              </Switch>
            </Router>
          </authContext.Provider>
        </Provider>
      );
    } else {
      return <LoginPage onSignIn={this.setUser} />;
    }
  }

  componentDidMount() {
    getUserEndpoint().then(this.setUser, this.onSignOut);
  }
}

export default App;
