import { Component } from "preact";
import { Router } from "preact-router";
import classnames from "classnames";

// Code-splitting is automated for routes
import Home from "../routes/Home/Home";
import Work from "../routes/Work/Work";
import About from "../routes/About/About";
import Packages from "../routes/Packages/Packages";
import Contact from "../routes/Contact/Contact";

export default class App extends Component {
  state = {
    hasNav: false
  };

  /** Gets fired when the route changes.
   *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
   *	@param {string} event.url	The newly routed URL
   */
  handleRoute = e => {
    this.currentUrl = e.url;
    this.setState({ hasNav: e.url !== "/" });
  };

  render() {
    return (
      <main id="app" class={classnames({ "with-nav": this.state.hasNav })}>
        <Router onChange={this.handleRoute}>
          <Home path="/" />
          <Work path="/work" />
          <About path="/about" />
          <Packages path="/packages" />
          <Contact path="/contact" />
        </Router>
      </main>
    );
  }
}
