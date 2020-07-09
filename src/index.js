// Must be the first import
if (process.env.NODE_ENV === "development") {
  // Must use require here as import statements are only allowed
  // to exist at the top of a file.
  require("preact/debug");
}

// styles
import "./style/index.scss";
import "locomotive-scroll/dist/locomotive-scroll.min.css";

import App from "./components/App";

export default App;
