"use strict";

import "./src/nav.js";

let sw = null;
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./src/sw.js").then((swRegistered) => {
    console.log("[ServiceWorker**] - Registered");
    sw = swRegistered;
  });
}
