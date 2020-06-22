import { useEffect, useCallback, useState } from "preact/hooks";
import anime from "animejs";
import classnames from "classnames";
import PropTypes from "prop-types";

function Home(props) {
  return (
    <section class="home">
      <article>
        <h1>A Day To Remember</h1>
        <figure>
          <img
            src="/assets/images/black-and-white-dance.jpeg"
            alt="Dancing couple"
          />
        </figure>
      </article>
    </section>
  );
}

export default Home;
