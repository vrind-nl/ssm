import {
  position2point,
  getPointsHTML,
  getRowHTML,
  getDurationMins,
} from "../GPS.js";

function getTraceRowHTML(points, i) {
  return getRowHTML(
    points[i],
    i < points.length - 1 ? points[points.length - 1] : null
  );
}

export default () => {
  // const history = [15, 30, 60, 3 * 60, 6 * 60, 12 * 60, 24 * 60];
  const period = 1,
    // visible = [1, 2, 4, 3*4, 6*4,12*4, 24*4],
    visible = [1, 2, 4, 8],
    maxIndex = Math.max(...visible),
    points = [];

  const intervalId = window.setInterval(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const point = position2point(position);

      if (
        points.length < 2 ||
        getDurationMins(points[0].timestamp, points[1].timestamp) >
          period * visible[0]
      ) {
        points.unshift(point);
        if (points.length > maxIndex) {
          points.pop();
        }
      } else {
        points[0] = point;
      }

      const selection = [0]
        .concat(visible)
        .filter((i) => i < points.length)
        .map((i) => points[i]);
      if (selection[selection.length - 1] !== points[points.length - 1]) {
        selection.push(points[points.length - 1]);
      }

      document.getElementById("traceContent").innerHTML = getPointsHTML(
        selection,
        getTraceRowHTML
      );
    });
  }, 1000);
  return () => window.clearInterval(intervalId);
};
