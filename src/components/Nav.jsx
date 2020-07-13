import { useEffect, useState, useRef } from "preact/hooks";
import { Link } from "preact-router/match";
import { debounce } from "lodash";
import classnames from "classnames";

import { routes } from "../util";

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
  }, [shrink]);

  return (
    <header class={classnames({ shrink })} ref={ref}>
      <nav class="nav">
        <Link href="/">
          <img src="/assets/icons/logo.png" />
          <h1>Kalli Bear Films</h1>
        </Link>
        <div>
          {routes.map(({ path }) => (
            <Link href={`/${path}`}>
              <button key={path}>{path}</button>
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
