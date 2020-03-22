/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useCallback, useState } from "preact/hooks";
import anime from "animejs";
import classnames from "classnames";

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [timeoutId, setTimeOutId] = useState(0);

  useEffect(() => {
    if (loaded) {
      anime({
        targets: "#waterfall",
        height: "0",
        easing: "easeInOutQuad",
        delay: 500,
        duration: 2000,
        borderTopLeftRadius: ["0%", "50%"],
        borderTopRightRadius: ["0%", "30%"]
      });
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
    <section class="home">
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
          <h1>Kalli Bear Films</h1>
        </article>
        <div id="waterfall" />
      </section>

      <section class="content">
        <h2>A Day To Remember</h2>
        <article class="testimonies">
          <em>
            "It’s impossible to see all the <b>micro moments</b> the day of your
            wedding. Through our video, we were able to see our parents dancing
            cheek to cheek and our father-in-law cry as we read our vows. And{" "}
            <b>that was just the beginning!"</b>
          </em>
          <em>"Video captures movement and sound."</em>
          <em>
            "You’ll laugh, you’ll cry - It’s the closest you’ll get to reliving{" "}
            <b>your wedding day.</b>""
          </em>
        </article>
      </section>
    </section>
  );
}
