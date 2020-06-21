import { useEffect, useCallback, useState } from "preact/hooks";
import anime from "animejs";
import classnames from "classnames";
import PropTypes from "prop-types";

function Home(props) {
  return (
    <section class="home">
      <header>
        <a>
          <img src="/assets/icons/logo.png" />
        </a>
        <nav>
          {props.routes.map(route => (
            <button key={route}>{route}</button>
          ))}
        </nav>
      </header>
      {/* <figure></figure> */}
    </section>
  );
}

Home.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.string),
};

export default Home;
