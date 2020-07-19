import { useEffect } from "preact/hooks";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { words } from "lodash";

const animation = {
  x: "0vw",
  transition: { duration: 1.5 },
};

function Home() {
  const [topRef, topInView] = useInView();
  const [bottomRef, bottomInView] = useInView();
  const topControls = useAnimation();
  const bottomControls = useAnimation();

  useEffect(() => {
    console.log(topInView, bottomInView);
    if (topInView) {
      topControls.start(animation);
    }
    if (bottomInView) {
      bottomControls.start(animation);
    }
  }, [topControls, bottomControls, topInView, bottomInView]);

  return (
    <section class="home">
      <div class="background">
        <motion.img
          src="/assets/flairs/olive-3-white.png"
          alt=""
          class="olive"
          initial={{ marginTop: "90vh" }}
          animate={{ marginTop: 0 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
        <img
          src="/assets/flairs/gold-splatter-1.png"
          alt=""
          class="flip splat"
        />
        <img src="/assets/flairs/gold-splatter-3.png" alt="" class="splat" />
      </div>
      <article class="title">
        <h1>
          {words("Kalli Bear Films").map((word, i) => (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.3, ease: "easeIn" }}
            >
              {word}
            </motion.span>
          ))}
        </h1>
      </article>

      <article class="image" ref={topRef}>
        <figure>
          <motion.div initial={{ x: "-100vw" }} animate={topControls}>
            <img
              src="/assets/images/black-and-white-dance.jpeg"
              alt="Dancing couple"
            />
          </motion.div>
          <figcaption>
            <h2>
              {words("Wedding and Elopement Videography").map(word => (
                <span class="sr">{word}</span>
              ))}
            </h2>
          </figcaption>
        </figure>
      </article>

      <article class="image reverse" ref={bottomRef}>
        <figure>
          <figcaption>
            <h2>
              {words("A Day To Remember").map(word => (
                <span class="sr">{word}</span>
              ))}
            </h2>
          </figcaption>
          <motion.div initial={{ x: "100vw" }} animate={bottomControls}>
            <img
              src="/assets/images/unsplash/black-and-white-kiss.jpg"
              alt="Kissing couple"
            />
          </motion.div>
        </figure>
      </article>
    </section>
  );
}

export default Home;
