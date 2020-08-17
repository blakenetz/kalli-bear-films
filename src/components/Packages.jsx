import { h } from "preact";
import { useRef, useCallback } from "preact/hooks";
import { reduce, forIn, map, startCase } from "lodash";
import Slider from "react-slick";
import classnames from "classnames";

import {
  Clock,
  Message,
  Aperture,
  Speaker,
  Download,
  Video,
  Film,
  Package as Box,
  Check,
  DollarSign,
} from "./svg/PackageControls";

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 2,
  arrows: false,
};

// all data is stored here
const { baseCardValues, values } = reduce(
  {
    name: { content: "", icon: () => null, listContent: false },
    price: { content: 0, icon: DollarSign, listContent: false },
    hoursOfCoverage: {
      content: 0,
      icon: Clock,
      listContent: "Hours of Coverage",
      sound: "hihat",
    },
    ceremonyFilm: {
      content: false,
      icon: Film,
      listContent: "Ceremony Film",
      sound: "clap",
    },
    cinematicShort: {
      content: false,
      icon: Film,
      listContent: "Cinematic Short Film Edit (3-5 minutes)",
      sound: "clap",
    },
    cinematicFeature: {
      content: false,
      icon: Video,
      listContent: "Cinematic Feature Film Edit (15-40 minutes)",
      sound: "kick",
    },
    rawContent: {
      content: false,
      icon: Box,
      listContent: "RAW content delivery (Audio & Video)",
      sound: "kick",
    },
    consultation: {
      content: true,
      icon: Message,
      listContent: "Consultation (In person/Over the phone/Skype)",
      sound: "kick",
    },
    "4k Video": {
      content: true,
      icon: Aperture,
      listContent: "Filmed in Highest Quality 4k Video",
      sound: "clap",
    },
    highQualityAudio: {
      content: true,
      icon: Speaker,
      listContent: "Highest Quality Audio",
      sound: "kick",
    },
    digitalDownload: {
      content: true,
      icon: Download,
      listContent: "Digital Download & YouTube Link",
      sound: "hihat",
    },
  },
  (acc, val, key) => {
    const { content, ...rest } = val;
    acc.baseCardValues[key] = content;
    acc.values[key] = rest;

    return acc;
  },
  { baseCardValues: {}, values: {} }
);

const tiers = [
  {
    ...baseCardValues,
    name: "Tier 1",
    price: 1095,
    description:
      "The Tier 1 cinematography package is a perfect foundation to capture your special day. This package will provide you with 1 cinematographer for up to 5 hours capturing the ceremony and reception professionally and creatively. The final step is creating a ceremony edit using multiple camera angles.",
    hoursOfCoverage: 5,
    ceremonyFilm: true,
  },
  {
    ...baseCardValues,
    name: "Tier 2",
    price: 1800,
    description:
      "The Tier 2 cinematography package is a great all around package. This package will provide you with 1 cinematographer for up to 7 hours capturing the ceremony and reception professionally and creatively. The final step is creating a gorgeous cinematic short film highlighting all the best moments from your wedding with multiple camera angles. This includes ceremony, reception, speeches.",
    hoursOfCoverage: 7,
    cinematicShort: true,
  },
  {
    ...baseCardValues,
    name: "Tier 3",
    price: 2800,
    description:
      "The Tier 3 cinematography package is the perfect all around package. This package includes all items from Tier 1 and 2 in addition to 2 cinematographers for up to 9 hours capturing the entire day, professionally and creatively. We will capture the entire day, from the moment you start getting ready to the moment you leave the reception. The final step is creating a gorgeous cinematic short film in addition to a feature film.",
    hoursOfCoverage: 9,
    cinematicShort: true,
    cinematicFeature: true,
    rawContent: true,
  },
];

const additionalServices = [
  {
    ...baseCardValues,
    name: "Elopement",
    price: 1200,
    description:
      "For those that are looking forward to their very special elopement, we support you! Elopements are great because their small, intimate, and you can really be adventurous with your location. It allows us to completely tailor the video and audio to you as a couple. This package includes 1 cinematographer for up to 5 hours and finally, we will create a gorgeous cinematic short film telling your elopement story.",
    hoursOfCoverage: 5,
    cinematicShort: true,
  },
  {
    ...baseCardValues,
    name: "Save The Date",
    price: 950,
    description:
      "Looking for a special and unique way to send out your save the dates. Why not include a cinematic short film to show your friends and family how excited you are to have them join you on your special day?! It gives an old tradition a fun twist and  fits perfectly for when you schedule that engagement shoot. This package includes 1 cinematographer for up to 4 hours and finally, we will create a gorgeous cinematic short film. We’ve seen this video played out at a reception and had great results. Nothing like another good tear jerker before getting on the dance floor!",
    hoursOfCoverage: 4,
    cinematicShort: true,
  },
];

const addOns = [
  {
    name: "Instagram Teaser",
    price: 400,
    description:
      "A 1-minute Sneak Preview of your wedding posted online 2 weeks after your event.",
  },
  {
    name: "Additional Cinematographer",
    price: 600,
    description:
      "Recommended for large events of 300 or more guests. This allows us to capture more angles of your event and more importantly, more shots of your wedding guests.",
  },
  {
    name: "Drone Footage",
    price: 400,
    description:
      "An ideal add on for those one of a kind destination weddings with beautiful landscapes & atmosphere. This will take your weeding video to a whole new level (literally & figuratively).",
  },
  {
    name: "Additional Hours",
    price: 200,
    description:
      "Adding hours to your wedding day allows us to capture a few more moments that happen throughout the day, especially at the end of the reception.",
  },
  {
    name: "Mini Documentary Story",
    price: 1095,
    description:
      "A 3-5 minutes story of your relationship (interview based) filmed prior to wedding. Your wedding guests will enjoy getting to know you as a couple on your wedding reception.",
    note: "Projector not included.",
  },
  {
    name: "RAW Footage",
    price: 250,
    description:
      "A hard drive full of ALL of the footage we captured on your wedding day. Unedited.",
    note: "500 GB hard drive included.",
  },
  {
    name: "Travel Fee",
    price: 400,
    description: "We love traveling!",
    note: "Price subject to change.",
  },
];

// reformat data for table
const table = reduce(
  [...tiers, ...additionalServices],
  (acc, card, i) => {
    forIn(card, (val, key) => {
      if (key === "name") {
        if (i === 0) acc.head.push("");
        acc.head.push(val);
      } else if (key !== "description") {
        if (i === 0) {
          // push row label
          acc.body[key] = [key];
        }
        acc.body[key].push(val);
      }
    });

    return acc;
  },
  {
    head: [],
    body: {},
  }
);

function Packages() {
  const hihatRef = useRef();
  const clapRef = useRef();
  const kickRef = useRef();

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

  return (
    <>
      <audio preload="auto" src="/samples/clap.wav" ref={clapRef} />
      <audio preload="auto" src="/samples/hihat.wav" ref={hihatRef} />
      <audio preload="auto" src="/samples/kick.wav" ref={kickRef} />

      <section class="packages">
        <>
          <section class="tiers">
            <h2>Pick a package</h2>
            <Slider {...sliderSettings}>
              {tiers.map(tier => (
                <>
                  <h3>
                    {tier.name} Package: ${tier.price}
                  </h3>
                  <p>{tier.description}</p>
                </>
              ))}
            </Slider>
          </section>
        </>

        <section class="add-ons">
          <Slider {...sliderSettings} rows={2}>
            {addOns.map(item => (
              <>
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
              </>
            ))}
          </Slider>
        </section>

        <section class="table-wrapper">
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
