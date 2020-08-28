import { useEffect } from "preact/hooks";
import PropTypes from "prop-types";
import { Link } from "preact-router/match";
import anime from "animejs";

import Close from "./svg/Close";
import { routes } from "../util";

function MenuDrawer(props) {
  const { showMenu, ready } = props;
  useEffect(() => {
    if (!ready) return;

    anime({
      easing: "easeOutQuad",
      loop: false,
      duration: 600,
      targets: ".drawer",
      width: showMenu ? [0, "70vw"] : ["70vw", 0],
    });
  }, [showMenu, ready]);

  return (
    <aside class="drawer">
      <div class="close-wrapper">
        <h1>Kalli Bear Films</h1>
        <button class="icon-button" onClick={props.handleClose}>
          <Close />
        </button>
      </div>

      <ul>
        {routes.map(({ path }) => (
          <li key={path}>
            <Link href={`/${path}`}>{path}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
MenuDrawer.propTypes = {
  handleClose: PropTypes.func.isRequired,
  showMenu: PropTypes.bool.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default MenuDrawer;
