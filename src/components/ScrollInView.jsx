import { useEffect } from "preact/hooks";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import PropTypes from "prop-types";

function ScrollInView(props) {
  const [ref, inView] = useInView();
  const controls = useAnimation();

  const { animate } = props;
  useEffect(() => {
    if (inView) {
      console.log(inView, controls);
      controls.start(animate);
    }
  }, [controls, inView, animate]);

  return (
    <motion.div
      class={props.class}
      ref={ref}
      initial={props.initial}
      animate={controls}
    >
      {props.children}
    </motion.div>
  );
}

ScrollInView.propTypes = {
  children: PropTypes.node.isRequired,
  initial: PropTypes.object.isRequired,
  animate: PropTypes.object.isRequired,
  class: PropTypes.string,
};
ScrollInView.defaultProps = {
  class: "",
};

export default ScrollInView;
