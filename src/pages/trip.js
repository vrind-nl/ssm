import { position2point, getPointsHTML, getRowHTML } from "../GPS.js";
import { testPoints } from "../fixtures.js";

function getTripRowHTML(points, i) {
  return getRowHTML(points[i], i < points.length - 1 ? points[i + 1] : null);
}
export default () => {
  const watchId = navigator.geolocation.watchPosition((position) => {
    document.getElementById("tripContent").innerHTML = getPointsHTML(
      [
        position2point(position),
        testPoints.amsterdam,
        testPoints.london,
        testPoints.paris,
      ],
      getTripRowHTML
    );
  });
  return () => {
    navigator.geolocation.clearWatch(watchId);
  };
};
