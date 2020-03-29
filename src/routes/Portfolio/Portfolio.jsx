/* eslint-disable react/jsx-no-bind */
import { useState } from "preact/hooks";
import YouTube from "react-youtube";
import classnames from "classnames";

import withNav from "../../components/HOC/WithNav/WithNav";
import { ErrorSVG, PlaySVG } from "../../components/svg/VideoControls";

const urls = [
  { id: "GUiVqvsaOww", couple: "Luke and Casey" },
  { id: "5w2bZPooMu0", couple: "Darian and Carly" },
  { id: "lEcbeHyUxBM", couple: "Dan and Stacy" },
  { id: "wjTa2UcgFwA", couple: "Max and Elizabeth" },
  { id: "KCeX8ShZ6U0", couple: "Chad and Holly" },
  { id: "mpcYl8nd6Ks", couple: "Ryan and Kimberly" },
  { id: "UGOxgwgplDo", couple: "York and Amanda" }
];

function Portfolio() {
  // track a single id
  const [targetVideo, setTargetVideo] = useState();
  const [readyVideo, setReadyVideo] = useState();
  // array of ids
  const [errorVideos, setErrorVideos] = useState([]);
  // iframe options
  const [opts, setOpts] = useState({ width: 0, height: 0 });

  function handleClick(id, e) {
    // match height of image element
    const { width, height } = e.currentTarget.getBoundingClientRect();
    setOpts({ width, height: height - height * 0.265 });
    // show youtube iframe
    setTargetVideo(id);
  }

  function handleReady(id) {
    setReadyVideo(id);
  }

  function handleError(id) {
    setErrorVideos([...errorVideos, id]);
  }

  return (
    <section class="portfolio">
      <h1>Portfolio</h1>
      <section class="grid">
        {urls.map(({ id, couple }) => {
          const isError = errorVideos.indexOf(id) !== -1;

          return (
            <article class="cell">
              <figure
                class={classnames("video", {
                  faded: targetVideo === id,
                  error: isError
                })}
                onClick={isError ? null : handleClick.bind(null, id)}
              >
                <img
                  src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
                  alt={`Wedding video for ${couple}`}
                />
                {isError ? <ErrorSVG /> : <PlaySVG />}
              </figure>

              {id === targetVideo && (
                <YouTube
                  videoId={id}
                  id={id}
                  containerClassName={classnames("video-iframe", {
                    ready: readyVideo === id
                  })}
                  opts={opts}
                  onReady={handleReady.bind(null, id)}
                  onError={handleError.bind(null, id)}
                  // onPlay={func}
                  // onPause={func}
                  // onEnd={func}
                  // onStateChange={func}
                  // onPlaybackRateChange={func}
                  // onPlaybackQualityChange={func}
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
