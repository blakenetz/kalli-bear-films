import { Link } from "preact-router/match";
import classnames from "classnames";
import PropTypes from "prop-types";

import { routes, startPoints } from "./HOC/WithNav/WithNav";

export function DesktopNav() {
  return (
    <nav class="nav">
      <a href="/">
        <h1>Kalli Bear Films</h1>
      </a>
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

function Animate() {
  return (
    <animate
      attributeName="stop-color"
      values="#ffb471;#eb8f90;#fafafa;#ffb471"
      dur="20s"
      repeatCount="indefinite"
    />
  );
}

export function MobileNav(props) {
  return (
    <nav class="nav mobile">
      <svg viewBox="0 0 215 110" preserveAspectRatio="none">
        <polygon
          class="anime-target"
          fill="url(#gradient)"
          points={startPoints}
        />

        <defs>
          <linearGradient id="gradient" x1="100%" y1="100%">
            <stop offset="0%" stop-color="#ffb471">
              <Animate />
            </stop>
            <stop offset="100%" stop-color="#ffb471">
              <Animate />
              <animate
                attributeName="offset"
                values=".95;.80;.60;.40;.20;0;.20;.40;.60;.80;.95"
                dur="14s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
        </defs>
      </svg>

      <ul class={classnames({ showing: props.showContent })}>
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
MobileNav.propTypes = {
  showContent: PropTypes.bool.isRequired,
};
