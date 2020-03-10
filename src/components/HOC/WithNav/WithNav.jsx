import { Link } from "preact-router/match";
import style from "./style";

function withNav(WrappedComponent) {
  function WithNav(props) {
    return (
      <>
        <aside class={style.aside}>
          <nav>
            <h1>Kalli Bear Films</h1>
            <ul>
              {[
                { title: "Work", route: "/work" },
                { title: "About", route: "/about" },
                { title: "Packages", route: "/packages" },
                { title: "Contact", route: "/contact" }
              ].map(({ title, route }) => (
                <li>
                  <Link to={route}>{title}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <WrappedComponent {...props} />
      </>
    );
  }

  WithNav.displayName = `withNav(${WrappedComponent.displayName ||
    WrappedComponent.name})`;

  return WithNav;
}

export default withNav;
