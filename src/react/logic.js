// http://www.movable-type.co.uk/scripts/latlong.html

// returns distance between two geo locations in nautical miles
export function getDistance(coords1, coords2) {
  if (
    !coords1 ||
    !coords2 ||
    (coords1.latitude === coords2.latitude &&
      coords1.longitude === coords2.longitude)
  ) {
    return 0;
  }

  var radlat1 = (Math.PI * coords1.latitude) / 180;
  var radlat2 = (Math.PI * coords2.latitude) / 180;
  var theta = coords1.longitude - coords2.longitude;
  var radtheta = (Math.PI * theta) / 180;
  var dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60;
  return dist;
}

// returns angle between two geo locations in degrees
export function getCourse(coords1, coords2) {}
