import { Link } from "preact-router/match";

function withNav(WrappedComponent) {
  function WithNav(props) {
    return (
      <>
        <aside class="aside">
          <nav>
            <a href="/">
              <h1>Kalli Bear Films</h1>
            </a>
            <ul>
              {["work", "about", "packages", "contact"].map(route => (
                <li>
                  <Link href={`/${route}`} activeClassName="active">
                    {route}
                  </Link>
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
