import { useMemo } from "preact/hooks";
import PropTypes from "prop-types";
import { find } from "lodash";

import Card from "./Card";
import Arrow from "../svg/Arrow";

function Carousel(props) {
  const { selected, data } = props;
  const selectedCard = useMemo(() => find(data, (_val, i) => i === selected), [
    selected,
    data,
  ]);

  return (
    <div class="carousel">
      <Card {...selectedCard} key={selectedCard.name} selected />

      <div class="next-cards">
        <div class="buttons">
          {["previous", "next"].map(direction => (
            <button
              class={`button-${direction} no-focus`}
              key={direction}
              onClick={() => props.handleButtonClick(direction)}
              title={`Select ${direction} tier`}
            >
              <span class="button-wrapper">
                <Arrow direction={direction} />
              </span>
            </button>
          ))}
        </div>
        {props.data.map((card, i) =>
          i === props.selected ? null : (
            <Card
              {...card}
              key={card.name}
              handleClick={() => props.handleCardClick(card.name)}
            />
          )
        )}
      </div>
    </div>
  );
}

Carousel.propTypes = {
  selected: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleButtonClick: PropTypes.func.isRequired,
  handleCardClick: PropTypes.func.isRequired,
};

export default Carousel;
