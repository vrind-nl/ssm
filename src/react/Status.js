import React from "react";
import LatLon from "geodesy/latlon-spherical.js";

import Timestamp from "../components/Timestamp";
import { geoLocation2LatLong, Location, Locations } from "../components/GPS";

const points = {
  amsterdam: new LatLon(52.366667, 4.9),
  london: new LatLon(51.507222, -0.1275),
  paris: new LatLon(48.856613, 2.352222),
};

function trip() {
  const [geoLocation, setGeoLocation] = React.useState(null);

  React.useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(setGeoLocation);
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  if (!geoLocation) {
    return <>Waiting for position information...</>;
  }

  return (
    <>
      <Timestamp timestamp={geoLocation.timestamp} />:
      <Location latlong={geoLocation2LatLong(geoLocation.coords)} />
      <p>
        <Locations latlong1={points.amsterdam} latlong2={points.london} />
      </p>
    </>
  );
}

export default trip;
