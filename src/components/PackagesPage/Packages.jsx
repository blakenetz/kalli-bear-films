import { h } from "preact";
import { useRef, useCallback, useState, useEffect } from "preact/hooks";
import { map, startCase, findIndex } from "lodash";
import classnames from "classnames";
import Slider from "react-slick";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

import { Check } from "../svg/PackageControls";
import { values, table, tiers, addOns, additionalServices } from "./data";
import Carousel from "./Carousel";

const animationSettings = {
  opacity: 1,
  x: 0,
  y: 0,
  transition: {
    duration: 1,
  },
};

const sliderProps = {
  dots: true,
  slidesToShow: 4,
  slidesToScroll: 3,
  responsive: [
    {
      breakpoint: 1100,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 770,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
};

const initialRight = { opacity: 0, x: 400, y: 100 };
const initialLeft = { opacity: 0, x: -400, y: 100 };

function Packages() {
  const hihatRef = useRef();
  const clapRef = useRef();
  const kickRef = useRef();
  // additional animation
  const [servicesRef, servicesInView] = useInView();
  const servicesControls = useAnimation();
  // addOn animation
  const [addOnRef, addOnInView] = useInView();
  const addOnControls = useAnimation();
  // table animation
  const [tableRef, tableInView] = useInView();
  const tableControls = useAnimation();

  const [selectedTier, setSelectedTier] = useState(0);
  const [selectedService, setSelectedService] = useState(0);

  useEffect(() => {
    if (servicesInView) {
      servicesControls.start(animationSettings);
    }
  }, [servicesInView, servicesControls]);

  useEffect(() => {
    if (addOnInView) {
      addOnControls.start(animationSettings);
    }
  }, [addOnInView, addOnControls]);

  useEffect(() => {
    if (tableInView) {
      tableControls.start(animationSettings);
    }
  }, [tableInView, tableControls]);

  /** @todo implement sounds */
  // const handleSound = useCallback(
  //   key => () => {
  //     const { sound } = values[key];

  //     switch (sound) {
  //       case "hihat":
  //         hihatRef.current.currentTime = 0;
  //         hihatRef.current.play();
  //         break;

  //       case "kick":
  //         kickRef.current.currentTime = 0;
  //         kickRef.current.play();
  //         break;

  //       default:
  //       case "clap":
  //         clapRef.current.currentTime = 0;
  //         clapRef.current.play();
  //         break;
  //     }
  //   },
  //   []
  // );

  const getNextCardIndex = useCallback((dir, lastIndex, selected) => {
    let nextCard = 0;

    // set tier by direction
    if (dir === "previous") {
      nextCard = selected === 0 ? lastIndex : selected - 1;
    } else {
      nextCard = selected === lastIndex ? 0 : selected + 1;
    }
    return nextCard;
  }, []);

  return (
    <>
      <audio preload="auto" src="/samples/clap.wav" ref={clapRef} />
      <audio preload="auto" src="/samples/hihat.wav" ref={hihatRef} />
      <audio preload="auto" src="/samples/kick.wav" ref={kickRef} />

      <section class="packages">
        <section class="tiers">
          <h2>Pick your package</h2>
          <Carousel
            selected={selectedTier}
            data={tiers}
            handleButtonClick={dir =>
              setSelectedTier(
                getNextCardIndex(dir, tiers.length - 1, selectedTier)
              )
            }
            handleCardClick={name => {
              setSelectedTier(findIndex(tiers, { name }));
            }}
          />
        </section>

        <motion.section
          class="services"
          ref={servicesRef}
          initial={initialLeft}
          animate={servicesControls}
        >
          <h2>Or browse our additional services</h2>
          <Carousel
            selected={selectedService}
            data={additionalServices}
            handleButtonClick={dir =>
              setSelectedService(
                getNextCardIndex(
                  dir,
                  additionalServices.length - 1,
                  selectedService
                )
              )
            }
            handleCardClick={name => {
              setSelectedService(findIndex(additionalServices, { name }));
            }}
          />
        </motion.section>

        <motion.section
          class="add-ons"
          ref={addOnRef}
          initial={initialRight}
          animate={addOnControls}
        >
          <h2>Select some add-ons</h2>

          <Slider {...sliderProps}>
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
        </motion.section>

        <motion.section
          class="table-wrapper"
          ref={tableRef}
          initial={initialLeft}
          animate={tableControls}
        >
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
        </motion.section>
      </section>
    </>
  );
}

export default Packages;
