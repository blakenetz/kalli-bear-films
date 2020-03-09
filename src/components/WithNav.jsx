import { Link } from "preact-router";

function WithNav(props) {
  <section>
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
    {props.children}
  </section>;
}

export default WithNav;
