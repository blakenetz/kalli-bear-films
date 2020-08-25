import { useEffect } from "preact/hooks";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { words } from "lodash";
import PropTypes from "prop-types";
import classnames from "classnames";

function AnimatedImage(props) {
  const [ref, inView] = useInView();
  const imgControls = useAnimation();
  const textControls = useAnimation();

  useEffect(() => {
    if (inView) {
      imgControls.start({
        x: 0,
        opacity: 1,
        transition: { duration: 1.5 },
      });

      textControls.start({
        opacity: 1,
        transition: { delay: 1.5, ease: "easeIn" },
      });
    }
  }, [inView, imgControls, textControls]);

  return (
    <article class={classnames("image", { reverse: props.reverse })} ref={ref}>
      <figure>
        <motion.div
          initial={{
            x: props.reverse ? 200 : -200,
            opacity: 0,
          }}
          animate={imgControls}
        >
          <img {...props.imageProps} />
        </motion.div>
        <figcaption>
          <motion.h2
            animate={{
              transition: { staggerChildren: 0.5 },
            }}
          >
            {words(props.text).map(word => (
              <motion.span initial={{ opacity: 0 }} animate={textControls}>
                {word}
              </motion.span>
            ))}
          </motion.h2>
        </figcaption>
      </figure>
    </article>
  );
}

AnimatedImage.propTypes = {
  reverse: PropTypes.bool,
  imageProps: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
  }).isRequired,
  text: PropTypes.string.isRequired,
};

AnimatedImage.defaultProps = {
  revers: false,
};

export default AnimatedImage;
