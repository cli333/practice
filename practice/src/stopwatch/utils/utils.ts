export const calculate = (timeInSeconds: number): string[] => {
  let hours: number = Math.floor(timeInSeconds / 3600);
  let minutes: number = Math.floor((timeInSeconds % 3600) / 60);
  let seconds: number = timeInSeconds - hours * 3600 - minutes * 60;

  let hoursFormat: string = hours < 10 ? `0${hours}` : `${hours}`;
  let minutesFormat: string = minutes < 10 ? `0${minutes}` : `${minutes}`;
  let secondsFormat: string = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return [hoursFormat, minutesFormat, secondsFormat];
};
