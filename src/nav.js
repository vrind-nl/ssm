"use strict";

import trace from "./pages/trace.js";
import trip from "./pages/trip.js";

/* Functions to open a page. Each returns a function to close that page again. */
const pages = {
  trace,
  trip,
  watch: () => {
    return () => {};
  },
  settings: () => {
    return () => {};
  },
  about: () => {
    return () => {};
  },
};

var tab = { name: "about", close: () => {} };
window.nav = (target) => {
  tab.close();
  document.getElementById(tab.name).style.display = "none";
  tab.name = target;
  tab.close = pages[tab.name]();
  document.getElementById(tab.name).style.display = "block";
};
