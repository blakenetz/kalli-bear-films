/* eslint-disable react/no-string-refs */
import { Component } from "preact";

const slides = [
  { img: "beach-couple", text: "Take pretty photos" },
  { img: "black-and-white-couple-kiss", text: "Of love and stuff" },
  { img: "sunflower-couple", text: "Right now" }
];

class Home extends Component {
  refs = [];
  setRef = dom => this.refs.push(dom);

  componentDidMount() {
    this.refs.forEach((dom, i) =>
      setTimeout(() => {
        console.log("hi");
        dom.style.opacity = 100;
      }, 1000 * i)
    );
  }

  render() {
    return (
      <section class="home">
        {slides.map(({ img, text }) => (
          <figure key={img} ref={this.setRef} style={{ opacity: 0 }}>
            <div>
              <img
                alt=""
                draggable="false"
                src={`../assets/images/${img}.jpg`}
              />
            </div>
            <figcaption>
              <h2>{text}</h2>
            </figcaption>
          </figure>
        ))}
      </section>
    );
  }
}

export default Home;
