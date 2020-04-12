import { h } from "preact";
import PropTypes from "prop-types";
import { map, reduce, forIn, flatMap, startCase } from "lodash";
import classnames from "classnames";

import withNav from "../../components/HOC/WithNav/WithNav";
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
} from "../../components/svg/PackageControls";

const WeddingOfferings = "Wedding Offerings";

// all data is stored here
const { baseCardValues, values } = reduce(
  {
    name: { content: "", icon: () => null, listContent: false },
    price: { content: 0, icon: DollarSign, listContent: false },
    hoursOfCoverage: {
      content: 0,
      icon: Clock,
      listContent: "Hours of Coverage",
    },
    ceremonyFilm: { content: false, icon: Film, listContent: "Ceremony Film" },
    cinematicShort: {
      content: false,
      icon: Film,
      listContent: "Cinematic Short Film Edit (3-5 minutes)",
    },
    cinematicFeature: {
      content: false,
      icon: Video,
      listContent: "Cinematic Feature Film Edit (15-40 minutes)",
    },
    rawContent: {
      content: false,
      icon: Box,
      listContent: "RAW content delivery (Audio &amp; Video)",
    },
    consultation: {
      content: true,
      icon: Message,
      listContent: "Consultation (In person/Over the phone/Skype)",
    },
    "4k Video": {
      content: true,
      icon: Aperture,
      listContent: "Filmed in Highest Quality 4k Video",
    },
    highQualityAudio: {
      content: true,
      icon: Speaker,
      listContent: "Highest Quality Audio",
    },
    digitalDownload: {
      content: true,
      icon: Download,
      listContent: "Digital Download & YouTube Link",
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

// data is restructured for cards and derived from `baseCardValues`
const packages = [
  {
    title: WeddingOfferings,
    imgSrc: "/assets/images/unsplash/night-couple-party.jpg",
    imgAlt: "Newly weds at their after party",
    cards: [
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
    ],
  },
  {
    title: "Additional Services",
    imgSrc: "/assets/images/unsplash/bouquet.jpg",
    imgAlt: "A close up of a bouquet",
    cards: [
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
    ],
  },
];

// move tier 3 to middle spot
const sortedPackages = packages.map(p => {
  if (p.title === WeddingOfferings) {
    p.cards.splice(1, 0, p.cards.splice(2, 1)[0]);
  }

  return p;
});

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
  flatMap(packages, p => p.cards),
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

function Figure(props) {
  return (
    <figure>
      <div class="img-wrapper">
        <img src={props.imgSrc} alt={props.imgAlt} />
      </div>
      <figcaption>
        <div class="text-wrapper">
          <h2>{props.title}</h2>
        </div>
      </figcaption>
    </figure>
  );
}

function Packages() {
  return (
    <section class="packages">
      {sortedPackages.map(pack => (
        <>
          <Figure {...pack} />
          <section class="offering negative-top">
            {pack.cards.map(card => (
              <article class="cell">
                <h3>
                  {card.name} Package: ${card.price}
                </h3>
                <p>{card.description}</p>
                <ul>
                  {map(card, (val, key) =>
                    !!val && values[key] && values[key].listContent ? (
                      <li>
                        {h(values[key].icon)}
                        <span>
                          {val} {values[key].listContent}
                        </span>
                      </li>
                    ) : null
                  )}
                </ul>
              </article>
            ))}
          </section>
        </>
      ))}

      <section class="add-ons negative-top">
        <Figure
          imgSrc="/assets/images/unsplash/cropped-bride.jpg"
          imgAlt="Image of a bride cropped by her future husband"
          title="Add Ons"
        />
        <div class="grid negative-top">
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
        </div>
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
  );
}

Figure.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default withNav(Packages);
