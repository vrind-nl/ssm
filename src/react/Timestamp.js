import React from "react";

function Timestamp({ timestamp }) {
  const datetime = new Date(timestamp).toISOString();
  return (
    <>
      {datetime.substring(0, 10)} {datetime.substring(11, 19)}
    </>
  );
}

export default Timestamp;
