/**
 * lazy load all components
 */

export const routes = [
  {
    path: "portfolio",
    getComponent: () =>
      import("./components/Portfolio").then(module => module.default),
  },
  {
    path: "about",
    getComponent: () =>
      import("./components/About").then(module => module.default),
  },
  {
    path: "packages",
    getComponent: () =>
      import("./components/PackagesPage/Packages").then(
        module => module.default
      ),
  },
  {
    path: "contact",
    getComponent: () =>
      import("./components/Contact").then(module => module.default),
  },
];
