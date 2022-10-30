import LatLon from "../node_modules/geodesy/latlon-spherical.js";

function getRelativeTimestamp(d, deltaHours) {
  d.setHours(d.getHours() + deltaHours);
  return d.getTime();
}

const now = new Date();
export const testPoints = {
  amsterdam: {
    timestamp: getRelativeTimestamp(now, -13),
    coords: new LatLon(52.366667, 4.9),
  },
  london: {
    timestamp: getRelativeTimestamp(now, -40),
    coords: new LatLon(51.507222, -0.1275),
  },
  paris: {
    timestamp: getRelativeTimestamp(now, -35),
    coords: new LatLon(48.856613, 2.352222),
  },
};
