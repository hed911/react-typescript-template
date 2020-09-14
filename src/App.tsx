import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Layout from "./hoc/Layout/Layout";
import Dashboard from "./containers/Dashboard/Dashboard";
import Services from "./containers/Services/Services";
import Users from "./containers/Users/Users";
import Counter from "./containers/Counter/counter";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  let routes = (
    <Switch>
      <Route path="/users" exact component={Users} />
      <Route path="/services" exact component={Services} />
      <Route path="/" exact component={Dashboard} />
      <Redirect to="/" />
    </Switch>
  );
  return (
    <div>
      <Layout>{routes}</Layout>
    </div>
  );
  /*return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Counter />
      </header>
    </div>
  );*/
}

export default App;
