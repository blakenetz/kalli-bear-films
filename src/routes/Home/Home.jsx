import { useEffect, useCallback, useState } from "preact/hooks";
import anime from "animejs";
import classnames from "classnames";
import { words } from "lodash";

function Home(props) {
  return (
    <section class="home">
      <div class="splatter">
        <img src="/assets/flairs/olive-3.png" alt="" class="olive" />
        <img src="/assets/flairs/gold-splatter-1.png" alt="" />
        <img src="/assets/flairs/gold-splatter-3.png" alt="" />
      </div>
      <article class="row-img">
        <figure>
          <figcaption>
            <h1>
              {words("A Day To Remember").map(word => (
                <span>{word}</span>
              ))}
            </h1>
          </figcaption>
          <img
            src="/assets/images/black-and-white-dance.jpeg"
            alt="Dancing couple"
          />
        </figure>
      </article>
      <article class="testimony">
        <div class="p-wrapper">
          <p>
            "It’s impossible to see all the micro moments the day of your
            wedding. Through our video, we were able to see our parents dancing
            cheek to cheek and our father-in-law cry as we read our vows. And
            that was just the beginning!"
          </p>
          <p>"Video captures movement and sound."</p>
          <p>
            "You’ll laugh, you’ll cry - It’s the closest you’ll get to reliving
            your wedding day."
          </p>
        </div>
      </article>
    </section>
  );
}

export default Home;
