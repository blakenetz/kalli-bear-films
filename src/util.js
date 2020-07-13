// `import` path relative to `components` dir
export const routes = [
  {
    path: "portfolio",
    getComponent: () =>
      import("./components/Portfolio/Portfolio").then(module => module.default),
  },
  {
    path: "about",
    getComponent: () =>
      import("./components/About/About").then(module => module.default),
  },
  {
    path: "packages",
    getComponent: () =>
      import("./components/Packages/Packages").then(module => module.default),
  },
  {
    path: "contact",
    getComponent: () =>
      import("./components/Contact/Contact").then(module => module.default),
  },
];
