import PropTypes from "prop-types";

export default function Arrow({ direction }) {
  const svgProps = {
    class: `arrow-${direction}`,
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    x: "0px",
    y: "0px",
    viewBox: "0 0 25.5 32",
    style: "enable-background:new 0 0 25.5 32;",
  };

  return direction === "next" ? (
    <svg {...svgProps}>
      <path class="st0" d="M25.5,16L0,32V0L25.5,16z" />
    </svg>
  ) : (
    <svg {...svgProps}>
      <path class="st0" d="M0,16L25.5,0l0,31.9L0,16z" />
    </svg>
  );
}

Arrow.propTypes = {
  direction: PropTypes.oneOf(["next", "previous"]),
};

Arrow.defaultProps = {
  direction: "next",
};
