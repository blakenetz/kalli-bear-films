import { h } from "preact";
import classnames from "classnames";
import PropTypes from "prop-types";
import { map } from "lodash";

import { values } from "./data";

function Tier({
  selected,
  handleClick,
  name,
  price,
  description,
  ...listItems
}) {
  return (
    <article class={classnames({ selected })} onClick={handleClick}>
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
    </article>
  );
}

Tier.propTypes = {
  selected: PropTypes.bool,
  handleClick: PropTypes.func,
};

Tier.defaultProps = {
  selected: false,
  handleClick: () => null,
};

export default Tier;
