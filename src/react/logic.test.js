import { getDistance, getCourse } from "./logic";

const amsterdam = { latitude: 4.9, longitude: 52.366667 };
const london = { latitude: -0.1275, longitude: 51.507222 };
const paris = { latitude: 2.352222, longitude: 48.856613 };

test("calculates distance", () => {
  expect(getDistance(amsterdam, null)).toBe(0);
  expect(getDistance(amsterdam, amsterdam)).toBe(0);
  expect(getDistance(amsterdam, london)).toBeCloseTo(306.016);
  expect(getDistance(amsterdam, london)).toBe(getDistance(london, amsterdam));
  expect(getDistance(amsterdam, paris)).toBeCloseTo(259.879);
  expect(getDistance(london, paris)).toBeCloseTo(217.751);
});

// test("calculates courses", () => {
//   expect(getCourse(amsterdam, null)).toBe(0);
//   expect(getCourse(amsterdam, amsterdam)).toBe(0);
//   expect(getCourse(amsterdam, london)).toBeCloseTo(306.016);
//   expect(getCourse(amsterdam, paris)).toBeCloseTo(259.879);
// });
