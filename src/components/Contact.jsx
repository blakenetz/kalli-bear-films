import { useCallback, useReducer } from "preact/hooks";
import { reduce } from "lodash";

const fields = [
  { label: "Name", autoComplete: "name", required: true },
  { label: "Email", type: "email", autoComplete: "email", required: true },
  { label: "Phone", autoComplete: "tel", type: "number" },
  {
    label: "What type of video are you looking for?",
    type: "checkbox",
    options: ["Wedding Video", "Elopement Video", "Save the Date", "Other"],
  },
  { label: "Event / Project Date", type: "date" },
  { label: "Estimate Guess Count", type: "number" },
  {
    label: "Are you interested in any add ons?",
    type: "checkbox",
    options: [
      "Drone Footage",
      "Instagram Teaser",
      "Additional Cinematographer",
      "Additional Hours",
      "Mini Documentary Story",
      "RAW footage",
    ],
  },
  {
    label: "If there is anything specific, please let me know!",
    type: "textarea",
  },
];

function reducer(state, { name, value, checked, type }) {
  return {
    ...state,
    ...(type === "checkbox" ? { [value]: checked } : { [name]: value }),
  };
}

const initialState = reduce(
  fields,
  (acc, { label, options = [] }) => {
    if (options.length) {
      options.forEach(option => (acc[option] = false));
    } else {
      acc[label] = "";
    }

    return acc;
  },
  {}
);

function Checkbox(props) {
  return props.options.map(val => {
    return (
      <div class="checkbox">
        <input
          type="checkbox"
          name={props.name}
          value={val}
          aria-labelledby={`${props.name} ${val}`}
          {...props}
        />
        <label id={val}>{val}</label>
      </div>
    );
  });
}
function TextArea(props) {
  return (
    <textarea id={props.name} {...props}>
      {props.value}
    </textarea>
  );
}

function Contact() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = useCallback(e => {
    e.preventDefault();
  }, []);

  function onChange(e) {
    dispatch(e.target);
  }

  return (
    <section class="contact">
      <figure>
        <figcaption>
          <div class="text-wrapper">
            <h2>Let's chat!</h2>
            <p>You can reach me at:</p>
            <a
              href="mailto:andreas@kallibearfilms.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              andreas@kallibearfilms.com
            </a>
            <a href="tel:9703430980">(970) 343-0980</a>
          </div>
        </figcaption>
        <div class="img-wrapper">
          <img
            src="/assets/images/unsplash/pond-couple.jpg"
            alt="Newly weds by a pont"
          />
        </div>
      </figure>

      <article>
        <h2>Or I can reach out to you</h2>
        <p>But first a couple details</p>
      </article>

      <form onSubmit={handleSubmit}>
        {fields.map(f => {
          return (
            <div class="control">
              <label for={f.label}>{f.label}</label>

              {f.type === "checkbox" ? (
                <Checkbox {...f} name={f.label} onChange={onChange} />
              ) : f.type === "textarea" ? (
                <TextArea
                  {...f}
                  name={f.label}
                  onChange={onChange}
                  value={state[name]}
                />
              ) : (
                <input
                  id={f.label}
                  name={f.label}
                  type="text"
                  autoComplete={f.autoComplete || "on"}
                  onChange={onChange}
                  value={state[name]}
                />
              )}
            </div>
          );
        })}
        <div class="action">
          <input
            type="submit"
            role="button"
            value="Submit"
            class="slide-button"
          />
        </div>
      </form>
    </section>
  );
}

export default Contact;
