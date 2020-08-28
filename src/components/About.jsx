import { useEffect } from "preact/hooks";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

function About() {
  const [ref, inView] = useInView();
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration: 1,
        },
      });
    }
  }, [inView, controls]);

  return (
    <section class="about">
      <article>
        <figure>
          <div class="img-wrapper">
            <img
              src="/assets/images/thats-me.png"
              alt="Me holding a camera next to my wife"
            />
          </div>
          <figcaption>
            <div class="text-wrapper">
              <h2>My Story</h2>
              <p>
                I am a Colorado native who is infatuated with capturing images.
                After graduating with a film and motion picture/television
                degree, I dove straight into the dangerous world of advertising.
                While I still work and enjoy advertising, there was a big part
                of me that wanted to slow things down and simplify the craft.
                Now, if there is one thing I love to do, it’s to tell a story.
              </p>
            </div>
          </figcaption>
        </figure>
      </article>

      <motion.article
        class="your-story"
        ref={ref}
        initial={{ opacity: 0, x: 400, y: 100 }}
        animate={controls}
      >
        <img src="assets/flairs/watercolor-2.png" alt="olive leaf" />
        <div>
          <h2>Tell Your story.</h2>
          <p>
            You’ve already made one of the most important decisions of your
            life:
          </p>
          <p>Who to spend the rest of your life with.</p>

          <h2>Why video? Aren’t photos enough?</h2>
          <p>
            Photos are wonderful and they are a must have however, a video
            offers a new perspective. You get to see and hear how we interact,
            how we love, how we laugh and how we cry. In many years from now,
            your great-great-grandchildren will be able to watch a video of
            their great-great-grandparents having the time of their life.
          </p>
        </div>
      </motion.article>
    </section>
  );
}

export default About;
