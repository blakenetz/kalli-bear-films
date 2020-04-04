import withNav from "../../components/HOC/WithNav/WithNav";

function About(props) {
  return (
    <section>
      <article>
        <p>
          I am a Colorado native who is infatuated with capturing images. After
          graduating with a film and motion picture/television degree, I dove
          straight into the dangerous world of advertising. While I still work
          and enjoy advertising, there was a big part of me that wanted to slow
          things down and simplify the craft. Now, if there is one thing I love
          to do, it’s to tell a story.
        </p>
      </article>

      <article>
        <h2>Tell Your story.</h2>
        <p>
          You’ve already made one of the most important decisions of your life.
          Who to spend the rest of your life with.
        </p>
        <h3>Why video? Aren’t photos enough?</h3>
        <p>
          Photos are wonderful and they are a must have however, a video offers
          a new perspective. You get to see and hear how we interact, how we
          love, how we laugh and how we cry. In many years from now, your
          great-great-grandchildren will be able to watch a video of their
          great-great-grandparents having the time of their life.
        </p>
      </article>
    </section>
  );
}

export default withNav(About);
