import { useEffect, useCallback, useState } from "preact/hooks";
import anime from "animejs";
import classnames from "classnames";
import { words } from "lodash";

function Home(props) {
  return (
    <section class="home">
      <article class="row-img">
        <figure>
          <figcaption>
            <h1>
              {words("A Day To Remember").map(word => (
                <span>{word}</span>
              ))}
            </h1>
          </figcaption>
          <div class="img">
            <img
              src="/assets/images/black-and-white-dance.jpeg"
              alt="Dancing couple"
            />
          </div>
        </figure>
        <div class="splatter">
          <img src="/assets/flairs/gold-splatter-5.png" alt="" />
          <img src="/assets/flairs/gold-splatter-2.png" alt="" />
        </div>

        <img src="/assets/flairs/gold-splatter-2.png" alt="" />
      </article>
    </section>
  );
}

export default Home;
