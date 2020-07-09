import { Component } from "preact";
import { Router } from "preact-router";
import AsyncRoute from "preact-async-route";
import LocomotiveScroll from "locomotive-scroll";

import Nav from "../components/Navs";

// Code-splitting is automated for routes
import Home from "../routes/Home/Home";

export default class App extends Component {
  scroll = new LocomotiveScroll();

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
        <Nav />
        <Router onChange={this.handleRoute}>
          <Home default />
        </Router>
      </main>
    );
  }
}
