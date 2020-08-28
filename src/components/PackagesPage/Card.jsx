import { h } from "preact";
import classnames from "classnames";
import PropTypes from "prop-types";
import { map } from "lodash";
import { motion } from "framer-motion";

import { values } from "./data";

function Card({
  selected,
  handleClick,
  name,
  price,
  description,
  ...listItems
}) {
  return (
    <motion.article
      animate={{ opacity: 1 }}
      initial={{ opacity: 0.5 }}
      transition={{ ease: "easeIn", duration: selected ? 3 : 0.75 }}
      whileHover={{ scale: selected ? 1 : 1.025 }}
      class={classnames({ selected })}
      onClick={handleClick}
    >
      <h3>
        {name} Package: ${price}
      </h3>
      <p>{description}</p>

      {selected && (
        <ul>
          {map(listItems, (val, key) =>
            !!val && values[key] && values[key].listContent ? (
              <li>
                <span
                  // onFocus={handleSound(key)}
                  // onMouseEnter={handleSound(key)}
                  tabIndex={1}
                >
                  {h(values[key].icon)}
                </span>
                <span>
                  {val} {values[key].listContent}
                </span>
              </li>
            ) : null
          )}
        </ul>
      )}
    </motion.article>
  );
}

Card.propTypes = {
  selected: PropTypes.bool,
  handleClick: PropTypes.func,
};

Card.defaultProps = {
  selected: false,
  handleClick: () => null,
};

export default Card;
