import { useMemo } from "preact/hooks";
import PropTypes from "prop-types";

function Menu(props) {
  const xValues = useMemo(() => ({ x1: props.xStart, x2: props.xEnd }), [
    props.xEnd,
    props.xStart,
  ]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      {...props}
    >
      <line {...xValues} y1={props.yTop} y2={props.yTop} class="anime-top" />
      <line {...xValues} y1="12" y2="12" class="anime-middle" />
      <line
        {...xValues}
        y1={props.yBottom}
        y2={props.yBottom}
        class="anime-bottom"
      />
    </svg>
  );
}
Menu.propTypes = {
  yTop: PropTypes.number.isRequired,
  yBottom: PropTypes.number.isRequired,
  xStart: PropTypes.number.isRequired,
  xEnd: PropTypes.number.isRequired,
};

export default Menu;
