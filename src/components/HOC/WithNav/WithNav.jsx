/* eslint-disable react/jsx-no-bind */
import { useState, useEffect } from "preact/hooks";
import { capitalize, debounce } from "lodash";
import anime from "animejs";

import MenuSVG from "../../svg/Menu";
import { MobileNav, DesktopNav } from "../../Navs";

export const routes = ["portfolio", "about", "packages", "contact"];

const defaults = {
  easing: "easeOutQuad",
  loop: false,
  duration: 600,
};

const breakpoint = 576;
// for menu
export const startPoints = "0,0 0,110 0,0 215,0";
const endPoints = "0,0 0,110 186,86 215,0";
// for hamburger
const yTop = 6;
const yBottom = 18;
const xStart = 3;
const xEnd = 21;

export default function withNav(WrappedComponent) {
  function WithNav(props) {
    const [renderMenu, setRenderMenu] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showMenuContent, setShowMenuContent] = useState(false);

    useEffect(() => {
      if (showMenu === true) {
        // menu
        anime({
          ...defaults,
          targets: ".nav .anime-target",
          points: [{ value: endPoints }],
          complete: () => setShowMenuContent(true),
        });
        // icon
        anime({
          ...defaults,
          targets: ".menu .anime-top",
          y2: yBottom,
          duration: 300,
        });
        anime({
          ...defaults,
          targets: ".menu .anime-bottom",
          y2: yTop,
          duration: 300,
        });
        anime({
          ...defaults,
          targets: ".menu .anime-middle",
          duration: 300,
          x2: xStart,
          opacity: [1, 0],
        });
      } else {
        // menu
        anime({
          ...defaults,
          targets: ".nav .anime-target",
          points: [{ value: startPoints }],
          begin: () => setShowMenuContent(false),
        });
        // icon
        anime({
          ...defaults,
          targets: ".menu .anime-top",
          y2: yTop,
          duration: 300,
        });
        anime({
          ...defaults,
          targets: ".menu .anime-bottom",
          y2: yBottom,
          duration: 300,
        });
        anime({
          ...defaults,
          targets: ".menu .anime-middle",
          duration: 300,
          x2: xEnd,
          opacity: [0, 1],
        });
      }
    }, [showMenu]);

    useEffect(() => {
      if (window.innerWidth <= breakpoint) setRenderMenu(true);

      const onKeydown = e => (e.code === "Escape" ? setShowMenu(false) : null);
      const onResize = debounce(() => {
        if (window.innerWidth >= breakpoint) {
          setShowMenu(false);
          setShowMenuContent(false);
          setRenderMenu(false);
        } else {
          setRenderMenu(true);
        }
      }, 400);

      window.addEventListener("keydown", onKeydown);
      window.addEventListener("resize", onResize);
      return () => {
        onResize.cancel;
        window.removeEventListener("resize", onResize);
        window.removeEventListener("keydown", onKeydown);
      };
    }, []);

    return (
      <>
        <aside class="desktop-nav">
          <DesktopNav />
        </aside>

        <section class="page">
          <header>
            <h1>{capitalize(props.title || props.path.split("/")[1])}</h1>
            <MenuSVG
              class="menu"
              onClick={() => setShowMenu(!showMenu)}
              coordinates={[xStart, yTop, xEnd, yBottom]}
            />
          </header>
          {renderMenu && (
            <MobileNav showContent={showMenu && showMenuContent} />
          )}

          <WrappedComponent {...props} />
        </section>
      </>
    );
  }

  WithNav.displayName = `withNav(${
    WrappedComponent.displayName || WrappedComponent.name
  })`;

  return WithNav;
}
