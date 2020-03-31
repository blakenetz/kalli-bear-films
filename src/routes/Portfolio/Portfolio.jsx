/* eslint-disable react/jsx-no-bind */
import { useState, useEffect } from "preact/hooks";
import YouTube from "react-youtube";
import classnames from "classnames";
import anime from "animejs";

import withNav from "../../components/HOC/WithNav/WithNav";
import { ErrorSVG, PlaySVG } from "../../components/svg/VideoControls";

const videos = [
  { id: "GUiVqvsaOww", couple: "Luke and Casey" },
  { id: "5w2bZPooMu0", couple: "Darian and Carly" },
  { id: "lEcbeHyUxBM", couple: "Dan and Stacy" },
  { id: "wjTa2UcgFwA", couple: "Max and Elizabeth" },
  { id: "KCeX8ShZ6U0", couple: "Chad and Holly" },
  { id: "mpcYl8nd6Ks", couple: "Ryan and Kimberly" },
  { id: "UGOxgwgplDo", couple: "York and Amanda" }
];

const fadeInOpts = {
  targets: ".show .anime-target",
  opacity: [1, 0],
  easing: "easeOutExpo",
  duration: 600
};
const fadeOutOpts = {
  targets: ".ready .anime-target",
  opacity: [0, 1]
};

function Portfolio() {
  // track a single id
  const [showVideo, setShowVideo] = useState();
  const [readyVideo, setReadyVideo] = useState();
  // array of ids
  const [errorVideos, setErrorVideos] = useState([]);
  // iframe options
  const [opts, setOpts] = useState({ width: 0, height: 0 });

  useEffect(() => {
    anime
      .timeline()
      .add(fadeOutOpts)
      .add({ ...fadeInOpts, complete: () => setReadyVideo(showVideo) });
  }, [showVideo]);

  function handleClick(id, e) {
    // match height of image element
    const { width, height } = e.currentTarget.getBoundingClientRect();
    setOpts({ width, height: height - height * 0.265 });
    // show youtube iframe
    setShowVideo(id);
  }

  function handleError(id) {
    setErrorVideos([...errorVideos, id]);
  }

  function handleReady(e) {
    e.target.playVideo();
  }

  function handleEnd(id) {
    // find current in `video` array
    let currentIndex = -1;
    videos.forEach((url, i) => {
      if (url.id === id) {
        currentIndex = i;
      }
    });

    // show/start next video
    const { id: nextId } = videos[
      currentIndex !== videos.length - 1 ? currentIndex + 1 : 0
    ];
    setShowVideo(nextId);
  }

  return (
    <section class="portfolio">
      <h1>Portfolio</h1>
      <section class="grid">
        {videos.map(({ id, couple }) => {
          const isError = errorVideos.indexOf(id) !== -1;

          return (
            <article class="cell">
              <figure
                class={classnames("video", {
                  error: isError,
                  show: showVideo === id,
                  ready: readyVideo === id
                })}
                onClick={isError ? null : handleClick.bind(null, id)}
              >
                <img
                  src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
                  alt={`Wedding video for ${couple}`}
                  class="anime-target"
                />
                {isError ? <ErrorSVG /> : <PlaySVG class="anime-target" />}
              </figure>

              {id === showVideo && (
                <YouTube
                  videoId={id}
                  id={id}
                  containerClassName={classnames("video-iframe", {
                    ready: readyVideo === id
                  })}
                  opts={opts}
                  onError={handleError.bind(null, id)}
                  onReady={handleReady}
                  onEnd={handleEnd.bind(null, id)}
                />
              )}
            </article>
          );
        })}
      </section>
    </section>
  );
}

export default withNav(Portfolio);
