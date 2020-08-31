import React from "react";
import "./Main.css";

import Controls from "../controls/Controls";
import { calculate } from "../../utils/utils";

const Main: React.FC = () => {
  const [timeInSeconds, setTimeInSeconds] = React.useState<number>(0);
  const [timerArray, setTimerArray] = React.useState<string[]>([
    "00",
    "00",
    "00",
  ]);

  React.useEffect(() => {
    setTimerArray(calculate(timeInSeconds));
  }, [timeInSeconds]);

  return (
    <div className="Main">
      <section className="timer-container">
        <p className="timer-text">{timerArray[0]}</p>
        <span>:</span>
        <p className="timer-text">{timerArray[1]}</p>
        <span>:</span>
        <p className="timer-text">{timerArray[2]}</p>
      </section>
      <Controls setTimeInSeconds={setTimeInSeconds} />
    </div>
  );
};

export default Main;
