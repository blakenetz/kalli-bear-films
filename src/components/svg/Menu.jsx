import PropTypes from "prop-types";

function Menu(props) {
  const [x1, y1, x2, y2] = props.coordinates;

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
      <line x1={x1} x2={x2} y1={y1} y2={y1} class="anime-top" />
      <line x1={x1} x2={x2} y1="12" y2="12" class="anime-middle" />
      <line x1={x1} x2={x2} y1={y2} y2={y2} class="anime-bottom" />
    </svg>
  );
}
Menu.propTypes = {
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Menu;
