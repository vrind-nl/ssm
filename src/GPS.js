import LatLon from "../node_modules/geodesy/latlon-spherical.js";

export function position2point(position) {
  return {
    timestamp: position.timestamp,
    coords: new LatLon(position.coords.latitude, position.coords.longitude),
  };
}

function getTimeHTML(timestamp) {
  const date = new Date(timestamp);
  const human = date.toString();
  const iso = date.toISOString();

  return `${human.substring(0, 3)} ${iso.substring(0, 10)} ${iso.substring(
    11,
    19
  )} UTC`;
}

export function getDurationMins(timestamp1, timestamp2) {
  return (timestamp1 - timestamp2) / (60 * 1000);
}

function getDurationHTML(timestamp1, timestamp2) {
  var mins = Math.floor(getDurationMins(timestamp1, timestamp2));
  const hours = Math.floor(mins / 60);
  mins = mins - hours * 60;

  if (hours != 0) {
    if (mins < 10) {
      mins = `0${mins}`;
    }
    return `${hours}:${mins} hrs`;
  }
  return `${mins} mins`;
}

function getDistanceNM(coords1, coords2) {
  return coords1.distanceTo(coords2) / 1852;
}

function getDistanceHTML(coords1, coords2) {
  return getDistanceNM(coords1, coords2).toFixed(2) + "NM";
}

function getSpeedHTML(point1, point2) {
  const dist = getDistanceNM(point1.coords, point2.coords);
  const duration = getDurationMins(point1.timestamp, point2.timestamp) / 60;
  return (dist / duration).toFixed(2) + "Kts";
}

function getBearingHTML(coords1, coords2) {
  return `${coords1.finalBearingTo(coords2).toFixed(2)}&deg;`;
}

function getOpenSeaMapURL(coords) {
  return `https://map.openseamap.org/?zoom=14&mlat=${coords.lat}&mlon=${coords.lon}`;
}

function getOpenSeaMapHTML(coords, text = "&raquo;") {
  return `<a href="${getOpenSeaMapURL(
    coords
  )}" target="openseamap">${text}</a>`;
}

function getLocationHTML(latlong) {
  function coordinate(coord) {
    return coord.toFixed(3) + "&deg;";
  }

  return `(${coordinate(latlong.lat)} lat, ${coordinate(
    latlong.lon
  )} lon) ${getOpenSeaMapHTML(latlong)}`;
}

export function getRowHTML(point1, point2) {
  var row = `<td>${getTimeHTML(point1.timestamp)}</td>
  <td>${getLocationHTML(point1.coords)}</td>\n`;
  if (point2) {
    row += `<td>${getDurationHTML(point1.timestamp, point2.timestamp)}</td>
      <td>${getDistanceHTML(point1.coords, point2.coords)}</td>
      <td>${getSpeedHTML(point1, point2)}</td>
      <td>${getBearingHTML(point1.coords, point2.coords)}</td>`;
  } else {
    row += `<td>---</td>
    <td>---</td>
    <td>---</td>
    <td>---</td>`;
  }
  return row;
}

export function getPointsHTML(points, getRow) {
  var rows = ``;

  for (var i = 0; i < points.length; i++) {
    rows += `<tr>\n${getRow(points, i)}\n</tr>`;
  }

  return `<p>Local time: ${new Date()}</p>
  <table>
  <thead>
    <tr><th>Time<th>Coordinates</th><th>Duration</th><th>Distance</th><th>Speed</th><th>Bearing</th></tr>
  </thead>
  <tbody>
    ${rows}
  </tbody></table>`;
}
