import { useEffect, useState, useRef } from "preact/hooks";
import { Link } from "preact-router/match";
import { debounce } from "lodash";
import classnames from "classnames";
import anime from "animejs";
import PropTypes from "prop-types";

import { routes } from "../util";
import Menu, { coordinates } from "./svg/Menu";

const [x1, y1, x2, y2] = coordinates;

const animeSettings = {
  easing: "easeOutQuad",
  loop: false,
  duration: 600,
};

function Nav(props) {
  const ref = useRef();
  const [shrink, setShrink] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShrink(window.scrollY > 0);
    };
    const debounced = debounce(handleScroll, 50);

    window.addEventListener("scroll", debounced, {
      passiveIfSupported: true,
    });

    return () => {
      debounced.cancel;
      window.removeEventListener("scroll", debounced);
    };
  }, [shrink]);

  const { showMenu } = props;
  useEffect(() => {
    // menu icon
    anime({
      ...animeSettings,
      targets: ".menu .anime-top",
      y2: showMenu ? y2 : y1,
      duration: 300,
    });
    anime({
      ...animeSettings,
      targets: ".menu .anime-bottom",
      y2: showMenu ? y1 : y2,
      duration: 300,
    });
    anime({
      ...animeSettings,
      targets: ".menu .anime-middle",
      duration: 300,
      x2: showMenu ? x1 : x2,
      opacity: showMenu ? [1, 0] : [0, 1],
    });
  }, [showMenu]);

  return (
    <header class={classnames({ shrink })} ref={ref}>
      <nav class="nav">
        <Link href="/">
          <img src="/assets/icons/logo.png" />
          <h1>Kalli Bear Films</h1>
        </Link>
        <div class="links">
          {routes.map(({ path }) => (
            <Link href={`/${path}`}>
              <button key={path} class="slide-button">
                {path}
              </button>
            </Link>
          ))}
        </div>

        <div class="menu">
          <button class="icon-button" onClick={props.handleClick}>
            <Menu coordinates={coordinates} />
          </button>
        </div>
      </nav>
    </header>
  );
}

Nav.propTypes = {
  showMenu: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Nav;
