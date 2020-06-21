import { Component } from "preact";
import { Router } from "preact-router";
import AsyncRoute from "preact-async-route";
import classnames from "classnames";

// Code-splitting is automated for routes
import Home from "../routes/Home/Home";

const routes = ["portfolio", "about", "packages", "contact"];

export default class App extends Component {
  /** Gets fired when the route changes.
   *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
   *	@param {string} event.url	The newly routed URL
   */
  handleRoute = e => {
    this.currentUrl = e.url;
  };

  render() {
    return (
      <main id="app">
        <Router onChange={this.handleRoute}>
          <Home default routes={routes} />
        </Router>
      </main>
    );
  }
}
