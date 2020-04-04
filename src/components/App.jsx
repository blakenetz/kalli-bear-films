import { Component } from "preact";
import { Router } from "preact-router";
import classnames from "classnames";

// Code-splitting is automated for routes
import Home from "../routes/Home/Home";
import Portfolio from "../routes/Portfolio/Portfolio";
import About from "../routes/About/About";
import Packages from "../routes/Packages/Packages";
import Contact from "../routes/Contact/Contact";

import { routes } from "./HOC/WithNav/WithNav";

export default class App extends Component {
  state = {
    hasNav: false,
    showIntroAnim: true,
  };

  /** Gets fired when the route changes.
   *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
   *	@param {string} event.url	The newly routed URL
   */
  handleRoute = e => {
    this.currentUrl = e.url;
    const hasNav = e.url !== "/";
    this.setState({ hasNav });
    // don't show intro anim again
    if (hasNav) this.setState({ showIntroAnim: false });
  };

  render() {
    return (
      <main id="app" class={classnames({ "with-nav": this.state.hasNav })}>
        <Router onChange={this.handleRoute}>
          <Portfolio path="/portfolio" />
          <About path="/about" title="My Story" />
          <Packages path="/packages" />
          <Contact path="/contact" />
          <Home
            default
            showIntroAnim={this.state.showIntroAnim}
            routes={routes}
          />
        </Router>
      </main>
    );
  }
}
