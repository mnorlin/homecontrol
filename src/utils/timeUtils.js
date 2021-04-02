export function getTimeUntilHour(time) {
  const t = new Date();
  t.setHours(time.split(":")[0]);
  t.setMinutes(time.split(":")[1]);
  t.setSeconds(0);
  t.setMilliseconds(0);

  const timeLeft = t.getTime() - new Date().getTime();

  return timeLeft > 0 ? timeLeft : timeLeft + 1000 * 60 * 60 * 24; // If time has passed, add 1 day
}

export function calculateSchedule(sunrise, sunset, scenes = 5) {
  const start = sunrise.getTime();
  const stop = sunset.getTime();
  const step = (stop - start) / (scenes - 1);

  return [...new Array(scenes).keys()]
    .map((key) => new Date(start + step * key))
    .map((date) => `${addLeadingZero(date.getHours())}:${addLeadingZero(date.getMinutes())}`);
}

function addLeadingZero(t) {
  return t < 10 ? `0${t}` : t.toString();
}
