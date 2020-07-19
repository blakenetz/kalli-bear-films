/* eslint-disable react/jsx-no-bind */
import { useState, useEffect, useCallback } from "preact/hooks";
import YouTube from "react-youtube";
import classnames from "classnames";
import { debounce } from "lodash";

import { ErrorSVG, PlaySVG } from "./svg/VideoControls";

const videos = [
  { id: "GUiVqvsaOww", couple: "Luke and Casey" },
  { id: "5w2bZPooMu0", couple: "Darian and Carly" },
  { id: "lEcbeHyUxBM", couple: "Dan and Stacy" },
  { id: "wjTa2UcgFwA", couple: "Max and Elizabeth" },
  { id: "KCeX8ShZ6U0", couple: "Chad and Holly" },
  { id: "mpcYl8nd6Ks", couple: "Ryan and Kimberly" },
  { id: "UGOxgwgplDo", couple: "York and Amanda" },
];

// const fadeInOpts = {
//   targets: ".show .anime-target",
//   opacity: [1, 0],
//   easing: "easeOutExpo",
//   duration: 600,
// };
// const fadeOutOpts = {
//   targets: ".ready .anime-target",
//   opacity: [0, 1],
// };

const getHeight = height => height - height * 0.265;

function Portfolio() {
  // track a single id
  const [showVideo, setShowVideo] = useState();
  const [readyVideo, setReadyVideo] = useState();
  // array of ids
  const [errorVideos, setErrorVideos] = useState([]);
  // iframe options
  const [opts, setOpts] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // anime({
    //   targets: ".cell .video",
    //   duration: 1000,
    //   delay: anime.stagger(100, { start: 200 }),
    //   translateY: ["-100%", 0],
    //   elasticity: 200,
    // });

    const onResize = debounce(() => {
      const videoEl = document.querySelector(".show");
      if (videoEl) {
        const { width, height } = videoEl.getBoundingClientRect();
        setOpts({ width, height: getHeight(height) });
      }
    }, 400);

    window.addEventListener("resize", onResize);

    return () => {
      onResize.cancel;
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    // anime
    //   .timeline()
    //   .add(fadeOutOpts)
    //   .add({ ...fadeInOpts, complete: () => setReadyVideo(showVideo) });
  }, [showVideo]);

  const handleClick = useCallback(
    (id, e) => {
      const { width, height } = e.currentTarget.getBoundingClientRect();
      setOpts({ width, height: getHeight(height) });

      // show youtube iframe
      setShowVideo(id);
    },
    [setShowVideo]
  );

  const handleError = useCallback(
    id => {
      setErrorVideos([...errorVideos, id]);
    },
    [errorVideos]
  );

  const handleReady = useCallback(e => {
    e.target.playVideo();
  }, []);

  const handleEnd = useCallback(id => {
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
  }, []);

  return (
    <section class="portfolio">
      <div class="grid">
        {videos.map(({ id, couple }) => {
          const isError = errorVideos.indexOf(id) !== -1;

          return (
            <article class="cell">
              <figure
                class={classnames("video", {
                  error: isError,
                  show: showVideo === id,
                  ready: readyVideo === id,
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
                    ready: readyVideo === id,
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
      </div>
    </section>
  );
}

export default Portfolio;
