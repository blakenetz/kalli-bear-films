import { useState, useEffect } from "preact/hooks";
import PropTypes from "prop-types";

import style from "./style";

function Home(props) {
  useEffect(() => {}, []);

  return (
    <section class={style.home}>
      <h1>HOME</h1>
    </section>
  );
}

export default Home;
