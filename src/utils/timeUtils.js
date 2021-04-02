export function getTimeUntilHour(time) {
  const t = new Date();
  t.setHours(time.split(":")[0]);
  t.setMinutes(time.split(":")[1]);
  t.setSeconds(0);
  t.setMilliseconds(0);

  const timeLeft = t.getTime() - new Date().getTime();

  return timeLeft > 0 ? timeLeft : timeLeft + 1000 * 60 * 60 * 24; // If time has passed, add 1 day
}

export function calculateSchedule(sunrise, sunset) {
  if (!sunrise || !sunset) {
    return ["05:30", "8:00", "12:00", "18:00", "21:00"];
  }
  const hours = [];

  const middleOfDay = new Date(sunrise.getTime());

  const morningScene = sunrise.getTime() - 1000 * 60 * 30; // 30min before sunrise
  const forenoonScene = sunrise.getTime() + 1000 * 60 * 60 * 2; // 2h after sunrise
  const afternoonScene = sunrise.getTime() + (sunset.getTime() - sunrise.getTime()) / 2; // Middle of day
  const eveningScene = sunset.getTime(); // at sunset
  const night = sunset.getTime() + 1000 * 60 * 60 * 3; // night 3h after sunset

  hours.push(morningScene);
  hours.push(forenoonScene);
  hours.push(afternoonScene);
  hours.push(eveningScene);
  hours.push(night);

  return hours
    .map((timestamp) => new Date(timestamp))
    .map((date) => `${addLeadingZero(date.getHours())}:${addLeadingZero(date.getMinutes())}`);
}

function addLeadingZero(t) {
  return t < 10 ? `0${t}` : t.toString();
}
