export const getTimeFromSeconds = (seconds: number) => {
  const now = Date.now();

  const difference = {
    hours: Math.floor(seconds / (60 * 60)),
    minutes: Math.floor((seconds % (60 * 60)) / 60),
    seconds: seconds % 60,
  };

  return {
    hours: difference.hours,
    minutes: difference.minutes,
    seconds: difference.seconds,
    format: () =>
      `${difference.hours.toString().padStart(2, "0")}:${difference.minutes
        .toString()
        .padStart(2, "0")}:${difference.seconds.toString().padStart(2, "0")}`,
  };
};
