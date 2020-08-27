import { h } from "preact";
import { useRef, useCallback, useState } from "preact/hooks";
import { map, startCase, find, findIndex } from "lodash";
import classnames from "classnames";
import Slider from "react-slick";

import { Check } from "../svg/PackageControls";
import Arrow from "../svg/Arrow";
import { values, table, tiers, addOns } from "./data";
import Tier from "./Tier";

function Packages() {
  const hihatRef = useRef();
  const clapRef = useRef();
  const kickRef = useRef();

  const [selectedTier, setSelectedTier] = useState(0);

  const handleSound = useCallback(
    key => () => {
      const { sound } = values[key];

      switch (sound) {
        case "hihat":
          hihatRef.current.currentTime = 0;
          hihatRef.current.play();
          break;

        case "kick":
          kickRef.current.currentTime = 0;
          kickRef.current.play();
          break;

        default:
        case "clap":
          clapRef.current.currentTime = 0;
          clapRef.current.play();
          break;
      }
    },
    []
  );

  const handleTierClick = useCallback(
    (dir, name) => {
      let nextTier = 0;
      const lastIndex = tiers.length - 1;

      // set tier by index
      if (name) {
        nextTier = findIndex(tiers, { name });
        setSelectedTier(nextTier);
        return;
      }
      // set tier by direction
      if (dir === "previous") {
        nextTier = selectedTier === 0 ? lastIndex : selectedTier - 1;
      } else {
        nextTier = selectedTier === lastIndex ? 0 : selectedTier + 1;
      }
      console.log("next", nextTier);
      setSelectedTier(nextTier);
    },
    [selectedTier]
  );

  return (
    <>
      <audio preload="auto" src="/samples/clap.wav" ref={clapRef} />
      <audio preload="auto" src="/samples/hihat.wav" ref={hihatRef} />
      <audio preload="auto" src="/samples/kick.wav" ref={kickRef} />

      <section class="packages">
        <section class="tiers">
          <h2>Pick your package</h2>
          <div class="wrapper">
            <Tier {...find(tiers, (_val, i) => i === selectedTier)} selected />

            <div class="next-tiers">
              <div class="buttons">
                {["previous", "next"].map(direction => (
                  <button
                    class={`button-${direction} no-focus`}
                    key={direction}
                    onClick={() => handleTierClick(direction)}
                    title={`Select ${direction} tier`}
                  >
                    <span class="button-wrapper">
                      <Arrow direction={direction} />
                    </span>
                  </button>
                ))}
              </div>
              {tiers.map((tier, i) =>
                i === selectedTier ? null : (
                  <Tier
                    {...tier}
                    key={tier.name}
                    handleClick={() => handleTierClick(null, tier.name)}
                  />
                )
              )}
            </div>
          </div>
        </section>

        <section class="add-ons">
          <h2>Select some add-ons</h2>

          <Slider dots slidesToShow={3} slidesToScroll={3}>
            {addOns.map(item => (
              <article>
                <h3>
                  {item.name}
                  {Boolean(item.note) && <sup>*</sup>}
                </h3>
                <p>{item.price}</p>
                <p>{item.description}</p>
                {Boolean(item.note) && (
                  <p>
                    <sup>*</sup>
                    <em>{item.note}</em>
                  </p>
                )}
              </article>
            ))}
          </Slider>
        </section>

        <section class="table-wrapper">
          <h2>Review your options</h2>
          <table>
            <thead>
              <tr>
                {table.head.map(th => (
                  <th>{th}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {map(table.body, arr => (
                <tr>
                  {arr.map((val, i) => (
                    <td class={classnames({ first: i === 0 })}>
                      {i === 0 && h(values[val].icon)}

                      {val === true ? (
                        <Check />
                      ) : val === false ? (
                        ""
                      ) : (
                        <span>{startCase(val)}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </section>
    </>
  );
}

export default Packages;
