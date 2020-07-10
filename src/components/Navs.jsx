import { useEffect, useState, useRef } from "preact/hooks";
import { Link } from "preact-router/match";
import { debounce } from "lodash";
import classnames from "classnames";

const routes = ["portfolio", "about", "packages", "contact"];

export default function Nav() {
  const ref = useRef();
  const [shrink, setShrink] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShrink(window.scrollY > (shrink ? 65 : 10));
    };
    const debounced = debounce(handleScroll, 50);

    window.addEventListener("scroll", debounced, {
      passiveIfSupported: true,
    });

    return () => {
      debounced.cancel;
      window.removeEventListener("scroll", debounced);
    };
  }, []);

  return (
    <header class={classnames({ shrink })} ref={ref}>
      <nav class="nav">
        <a href="/">
          <img src="/assets/icons/logo.png" />
          <h1>Kalli Bear Films</h1>
        </a>
        <div>
          {routes.map(route => (
            <button key={route}>{route}</button>
          ))}
        </div>
      </nav>
    </header>
  );
}
