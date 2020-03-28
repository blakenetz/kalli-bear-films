import YouTube from "react-youtube";
import { useState } from "preact/hooks";

import withNav from "../../components/HOC/WithNav/WithNav";

const urls = [
  { id: "GUiVqvsaOww", couple: "Luke and Casey" },
  { id: "5w2bZPooMu0", couple: "Darian and Carly" },
  { id: "lEcbeHyUxBM", couple: "Dan and Stacy" },
  { id: "wjTa2UcgFwA", couple: "Max and Elizabeth" },
  { id: "KCeX8ShZ6U0", couple: "Chad and Holly" },
  { id: "mpcYl8nd6Ks", couple: "Ryan and Kimberly" },
  { id: "UGOxgwgplDo", couple: "York and Amanda" }
];

function Work() {
  const [targetVideo, setTargetVideo] = useState();

  return (
    <section id="portfolio">
      <h1>Portfolio</h1>
      <article class="grid">
        {urls.map(({ id, couple }) => (
          <div class="video">
            <img
              src={`https://img.youtube.com/vi/${id}/0.jpg`}
              alt={`Wedding video for ${couple}`}
            />
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              alt="play video"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg> */}
            <YouTube
              videoId={id}
              id={id}
              containerClassName="video-iframe"
              // opts={obj}
              // onReady={func}
              // onPlay={func}
              // onPause={func}
              // onEnd={func}
              // onError={func}
              // onStateChange={func}
              // onPlaybackRateChange={func}
              // onPlaybackQualityChange={func}
            />
          </div>
        ))}
      </article>
    </section>
  );
}

export default withNav(Work);
