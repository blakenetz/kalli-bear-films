/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useCallback, useState, useRef } from "preact/hooks";
import anime from "animejs";
import classnames from "classnames";

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [animLoaded, setAnimLoaded] = useState(false);
  const [timeoutId, setTimeOutId] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    if (loaded) {
      anime
        .timeline()
        // waterfall
        .add({
          targets: "#anim-waterfall",
          height: "0",
          easing: "easeInOutQuad",
          delay: 500,
          duration: 2000,
          borderTopLeftRadius: ["0%", "50%"],
          borderTopRightRadius: ["0%", "30%"],
          changeComplete: () => setAnimLoaded(true)
        })
        // first header
        .add({
          targets: "#anim-h1 .line",
          opacity: [0.5, 1],
          scaleX: [0, 1],
          easing: "easeInOutExpo",
          duration: 700
        })
        .add({
          targets: "#anim-h1 .line",
          duration: 600,
          easing: "easeOutExpo",
          translateY: (_el, i) => `${-0.625 + 0.625 * 2 * i}em`
        })
        .add({
          targets: "#anim-h1 .letters",
          opacity: [0, 1],
          scaleY: [0.5, 1],
          easing: "easeOutExpo",
          duration: 600,
          offset: "-=600"
        })

        // second header
        .add({});
    }

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [loaded]);

  const handleLoad = useCallback(() => {
    const id = window.setTimeout(() => setLoaded(true), 1500);
    setTimeOutId(id);
  }, []);

  return (
    <section class={classnames("home", { loaded: animLoaded })}>
      <section class={classnames("logo", { loaded })}>
        <img
          src="/assets/images/logo.png"
          alt="Kalli Bear Films logo"
          onLoad={handleLoad}
        />
      </section>

      <section class="title">
        <div class="bg-img" />

        <article class="title-content">
          <h1 id="anim-h1">
            <span class="text-wrapper" ref={ref}>
              <span class="line line1" />
              {"Kalli Bear Films".split(" ").map((l, i) => (
                <span class={`letters letters-${i}`}>{l}</span>
              ))}
              <span class="line line2" />
            </span>
          </h1>
        </article>
        <div id="anim-waterfall" />
      </section>

      <section class="content">
        <div class="angle" />

        <article>
          <h2 id="anim-h2">A Day To Remember</h2>
          <div class="testimonies">
            <em>
              "It’s impossible to see all the <b>micro moments</b> the day of
              your wedding. Through our video, we were able to see our parents
              dancing cheek to cheek and our father-in-law cry as we read our
              vows. And <b>that was just the beginning!"</b>
            </em>
            <em>"Video captures movement and sound."</em>
            <em>
              "You’ll laugh, you’ll cry - It’s the closest you’ll get to
              reliving <b>your wedding day.</b>""
            </em>
          </div>
        </article>
      </section>
    </section>
  );
}
