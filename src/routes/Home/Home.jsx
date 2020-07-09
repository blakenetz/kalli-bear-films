import { words } from "lodash";

function Home() {
  return (
    <section class="home" data-scroll-container>
      <div class="splatter">
        <img src="/assets/flairs/olive-3.png" alt="" class="olive" />
        <img src="/assets/flairs/gold-splatter-1.png" alt="" />
        <img src="/assets/flairs/gold-splatter-3.png" alt="" />
      </div>
      <article class="title" data-scroll-section>
        <h1 data-scroll>
          {words("Kalli Bear Films").map(word => (
            <span>{word}</span>
          ))}
        </h1>
      </article>
      <article class="image" data-scroll-section>
        <figure data-scroll>
          <img
            src="/assets/images/black-and-white-dance.jpeg"
            alt="Dancing couple"
          />
          <figcaption>
            <h2 data-scroll>
              {words("A Day To Remember").map(word => (
                <span>{word}</span>
              ))}
            </h2>
          </figcaption>
        </figure>
      </article>
    </section>
  );
}

export default Home;
