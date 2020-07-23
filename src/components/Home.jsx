import { motion } from "framer-motion";
import { words } from "lodash";

import AnimatedImage from "./AnimatedImage";

function Home() {
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

      <AnimatedImage
        imageProps={{
          src: "/assets/images/black-and-white-dance.jpeg",
          alt: "Dancing couple",
        }}
        text="Wedding and Elopement Videography"
      />

      <AnimatedImage
        imageProps={{
          src: "/assets/images/unsplash/black-and-white-kiss.jpg",
          alt: "Kissing couple",
        }}
        text="A Day To Remember"
        reverse
      />
    </section>
  );
}

export default Home;
