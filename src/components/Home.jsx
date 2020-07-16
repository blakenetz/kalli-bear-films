import { useEffect } from "preact/hooks";
import { words } from "lodash";
import ScrollReveal from "scrollreveal";

function Home() {
  useEffect(() => {
    const sr = ScrollReveal();
    sr.reveal(".sr", { delay: 500 });

    return () => {
      sr.destroy();
    };
  }, []);

  return (
    <section class="home">
      <div class="splatter">
        <img src="/assets/flairs/olive-3-white.png" alt="" class="olive" />
        <img src="/assets/flairs/gold-splatter-1.png" class="flip" alt="" />
        <img src="/assets/flairs/gold-splatter-3.png" alt="" />
      </div>
      <article class="title">
        <h1>
          {words("Kalli Bear Films").map(word => (
            <span class="sr">{word}</span>
          ))}
        </h1>
      </article>
      <article class="image">
        <figure>
          <img
            src="/assets/images/black-and-white-dance.jpeg"
            alt="Dancing couple"
          />
          <figcaption>
            <h2>
              {words("Wedding and Elopement Videography").map(word => (
                <span class="sr">{word}</span>
              ))}
            </h2>
          </figcaption>
        </figure>
      </article>
      <article class="image reverse">
        <figure>
          <figcaption>
            <h2>
              {words("A Day To Remember").map(word => (
                <span class="sr">{word}</span>
              ))}
            </h2>
          </figcaption>
          <img
            src="/assets/images/unsplash/black-and-white-kiss.jpg"
            alt="Kissing couple"
          />
        </figure>
      </article>
    </section>
  );
}

export default Home;
