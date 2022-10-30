import React from "react";

import LatLon from "geodesy/latlon-spherical.js";

export function geoLocation2LatLong(coords) {
  return new LatLon(coords.latitude, coords.longitude);
}

export function Distance({ latlong1, latlong2 }) {
  const km = latlong1.distanceTo(latlong2);
  return <>{(km / 1852).toFixed(2)} NM</>;
}

export function Bearing({ latlong1, latlong2 }) {
  return <>{latlong1.finalBearingTo(latlong2).toFixed(2)}&deg;</>;
}

export function Location({ latlong }) {
  function coordinate(coord) {
    return <>{coord.toFixed(3)}&deg;</>;
  }

  return (
    <>
      ({coordinate(latlong.lat)} lat, {coordinate(latlong.lon)} lon)
    </>
  );
}
export function Locations(props) {
  return (
    <>
      <p>
        From:
        <Location latlong={props.latlong1} />
      </p>
      <p>
        To:
        <Location latlong={props.latlong2} />
      </p>
      <p>
        Distance:
        <Distance {...props} />
      </p>
      <p>
        Bearing:
        <Bearing {...props} />
      </p>
    </>
  );
}

export default function GPS({ geoLocation }) {
  return <Location coords={geoLocation.coords} />;
}
