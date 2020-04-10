import { values, toString } from "lodash";

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
} from "../../components/svg/PackageControls";

const defaults = {
  name: "",
  price: 0,
  coverage: 0,
  ceremonyFilm: false,
  cinematicShort: false,
  cinematicFeature: false,
  rawContent: false,
  consultation: true,
  "4kVideo": true,
  highQualityAudio: true,
  digitalDownload: true,
};

const packages = [
  {
    title: "Wedding Offerings",
    imgSrc: "/assets/images/unsplash/night-couple-party.jpg",
    imgAlt: "Newly weds at their after party",
    cards: [
      {
        ...defaults,
        name: "Tier 1",
        price: 1095,
        description:
          "The Tier 1 cinematography package is a perfect foundation to capture your special day. This package will provide you with 1 cinematographer for up to 5 hours capturing the ceremony and reception professionally and creatively. The final step is creating a ceremony edit using multiple camera angles.",
        coverage: 5,
        ceremonyFilm: true,
      },
      {
        ...defaults,
        name: "Tier 3",
        price: 2800,
        description:
          "The Tier 3 cinematography package is the perfect all around package. This package includes all items from Tier 1 and 2 in addition to 2 cinematographers for up to 9 hours capturing the entire day, professionally and creatively. We will capture the entire day, from the moment you start getting ready to the moment you leave the reception. The final step is creating a gorgeous cinematic short film in addition to a feature film.",
        coverage: 9,
        cinematicShort: true,
        cinematicFeature: true,
      },
      {
        ...defaults,
        name: "Tier 2",
        price: 1800,
        description:
          "The Tier 2 cinematography package is a great all around package. This package will provide you with 1 cinematographer for up to 7 hours capturing the ceremony and reception professionally and creatively. The final step is creating a gorgeous cinematic short film highlighting all the best moments from your wedding with multiple camera angles. This includes ceremony, reception, speeches.",
        coverage: 7,
        cinematicShort: true,
      },
    ],
  },
  {
    title: "Additional Services",
    imgSrc: "/assets/images/unsplash/bouquet.jpg",
    imgAlt: "A close up of a bouquet",
    cards: [
      {
        ...defaults,
        name: "Elopement",
        price: 1200,
        description:
          "For those that are looking forward to their very special elopement, we support you! Elopements are great because their small, intimate, and you can really be adventurous with your location. It allows us to completely tailor the video and audio to you as a couple. This package includes 1 cinematographer for up to 5 hours and finally, we will create a gorgeous cinematic short film telling your elopement story.",
        coverage: 5,
        cinematicShort: true,
      },
      {
        ...defaults,
        name: "Save The Date",
        price: 950,
        description:
          "Looking for a special and unique way to send out your save the dates. Why not include a cinematic short film to show your friends and family how excited you are to have them join you on your special day?! It gives an old tradition a fun twist and  fits perfectly for when you schedule that engagement shoot. This package includes 1 cinematographer for up to 4 hours and finally, we will create a gorgeous cinematic short film. We’ve seen this video played out at a reception and had great results. Nothing like another good tear jerker before getting on the dance floor!",
        coverage: 4,
        cinematicShort: true,
      },
    ],
  },
];

function Packages() {
  return (
    <section class="packages">
      {packages.map(p => (
        <>
          <figure>
            <div class="img-wrapper">
              <img src={p.imgSrc} alt={p.imgAlt} />
            </div>
            <figcaption>
              <div class="text-wrapper">
                <h2>{p.title}</h2>
              </div>
            </figcaption>
          </figure>
          <section class="offering">
            {p.cards.map(card => (
              <article class="cell">
                <h3>
                  {card.name} Package: ${card.price}
                </h3>
                <p>{card.description}</p>
                <ul>
                  <li>
                    <Clock />
                    <span>{card.coverage} Hours of Coverage</span>
                  </li>
                  {card.ceremonyFilm && (
                    <li>
                      <Film />
                      <span>Ceremony Film</span>
                    </li>
                  )}
                  {card.cinematicShort && (
                    <li>
                      <Film />
                      <span>Cinematic Short Film Edit (3-5 minutes)</span>
                    </li>
                  )}
                  {card.cinematicFeature && (
                    <li>
                      <Video />
                      <span>Cinematic Feature Film Edit (15-40 minutes)</span>
                    </li>
                  )}
                  {card.rawContent && (
                    <li>
                      <Box />
                      <span>RAW content delivery (Audio &amp; Video)</span>
                    </li>
                  )}
                  {card.consultation && (
                    <li>
                      <Message />
                      Consultation (In person/Over the phone/Skype)
                    </li>
                  )}
                  {card["4kVideo"] && (
                    <li>
                      <Aperture />
                      <span>Filmed in Highest Quality 4k Video</span>
                    </li>
                  )}
                  {card.highQualityAudio && (
                    <li>
                      <Speaker />
                      <span>Highest Quality Audio</span>
                    </li>
                  )}
                  {card.digitalDownload && (
                    <li>
                      <Download />
                      <span>Digital Download &amp; YouTube Link</span>
                    </li>
                  )}
                </ul>
              </article>
            ))}
          </section>
        </>
      ))}

      <h1 style={{ textAlign: "center" }}>Comparison table will go here :)</h1>

      {/* <table>
        <thead>
          <tr>
            {Object.keys(defaults).map(th => (
              <th>{th}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {packages.map(p => (
            <>
              {p.cards.map(card => (
                <tr>
                  {values(card).map(val => (
                    <td>{toString(val)}</td>
                  ))}
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </table> */}
    </section>
  );
}

export default withNav(Packages);
