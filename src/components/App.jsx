import { Component } from "preact";
import { Router } from "preact-router";
import AsyncRoute from "preact-async-route";
import { startCase } from "lodash";

import Nav from "./Nav";
import Home from "./Home";
import MenuDrawer from "./MenuDrawer";
import Loader from "./Loader";
import { routes } from "../util";

export default class App extends Component {
  state = {
    showMenu: false,
    ready: false,
  };

  handleChange = e => {
    const [, path] = e.url.split("/");
    document.title = `Kalli Bear Films ${
      path.length ? `- ${startCase(path)}` : ""
    }`.trim();

    this.setState({ showMenu: false });
  };

  render() {
    return (
      <main id="app">
        <Nav
          showMenu={this.state.showMenu}
          handleClick={() =>
            this.setState(prev => ({ showMenu: !prev.showMenu, ready: true }))
          }
        />
        <Router onChange={this.handleChange}>
          <Home default path="/" />
          {routes.map(route => (
            <AsyncRoute
              key={route.path}
              path={`/${route.path}`}
              getComponent={route.getComponent}
              loading={() => <Loader />}
            />
          ))}
        </Router>
        <MenuDrawer
          showMenu={this.state.showMenu}
          ready={this.state.ready}
          handleClose={() => this.setState({ showMenu: false })}
        />
      </main>
    );
  }
}
