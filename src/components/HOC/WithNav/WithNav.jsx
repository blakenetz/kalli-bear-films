/* eslint-disable react/jsx-no-bind */
import { Link } from "preact-router/match";
import { useState } from "preact/hooks";
import { capitalize } from "lodash";
import PropTypes from "prop-types";
import classnames from "classnames";

import MenuSVG from "../../svg/Menu";

export const routes = ["portfolio", "about", "packages", "contact"];

function Nav(props) {
  return (
    <nav class={classnames("nav", { mobile: !props.isDesktop })}>
      {props.isDesktop && (
        <a href="/">
          <h1>Kalli Bear Films</h1>
        </a>
      )}
      <ul>
        {routes.map(route => (
          <li>
            <Link href={`/${route}`} activeClassName="active">
              {route}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
Nav.propTypes = {
  isDesktop: PropTypes.bool,
};
Nav.defaultProps = {
  isDesktop: false,
};

export default function withNav(WrappedComponent) {
  function WithNav(props) {
    const [showMenu, setShowMenu] = useState(false);

    console.log(props);

    return (
      <>
        <aside class="desktop-nav">
          <Nav isDesktop />
        </aside>

        <section class="page">
          <header>
            <h1>{capitalize(props.title || props.path.split("/")[1])}</h1>
            <MenuSVG class="menu" onClick={() => setShowMenu(true)} />
          </header>

          <WrappedComponent {...props} />
        </section>

        {showMenu && <Nav class="mobile-menu" />}
      </>
    );
  }

  WithNav.displayName = `withNav(${
    WrappedComponent.displayName || WrappedComponent.name
  })`;

  return WithNav;
}
