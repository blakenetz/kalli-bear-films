import { Component } from "preact";
import { Router } from "preact-router";
import AsyncRoute from "preact-async-route";
import { startCase } from "lodash";

import Nav from "./Nav";
import Home from "./Home/Home";
import { routes } from "../util";

export default class App extends Component {
  handleChange = e => {
    const [, path] = e.url.split("/");
    document.title = `Kalli Bear Films ${
      path.length ? `- ${startCase(path)}` : ""
    }`.trim();
  };

  render() {
    return (
      <main id="app">
        <Nav />
        <Router onChange={this.handleChange}>
          <Home default path="/" />
          {routes.map(route => (
            <AsyncRoute
              key={route.path}
              path={`/${route.path}`}
              getComponent={route.getComponent}
              loading={() => <div>loading...</div>}
            />
          ))}
        </Router>
      </main>
    );
  }
}
