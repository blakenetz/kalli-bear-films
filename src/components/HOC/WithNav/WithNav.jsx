import { Link } from "preact-router";

function withNav(WrappedComponent) {
  function WithNav(props) {
    return (
      <>
        <aside class={styles.nav}>
          <nav>
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

  console.log(WrappedComponent.name);

  WithNav.displayName = `withNav(${WrappedComponent.displayName ||
    WrappedComponent.name})`;

  return WithNav;
}

export default withNav;
