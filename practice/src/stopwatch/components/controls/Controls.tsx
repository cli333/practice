import React from "react";
import "./Controls.css";

interface Props {
  setTimeInSeconds: React.Dispatch<React.SetStateAction<number>>;
}

const Controls = (props: Props) => {
  const { setTimeInSeconds } = props;

  const [intervalId, setIntervalId] = React.useState<number>(0);

  const handlePlay = () => {
    let interval: any = setInterval(() => {
      setTimeInSeconds((prevState: number) => prevState + 1);
    }, 1000);
    setIntervalId(interval);
  };

  const handleStop = () => {
    clearInterval(intervalId);
  };

  const handleReset = () => {
    handleStop();
    setTimeInSeconds(0);
  };

  return (
    <section className="controls-container">
      <button onClick={handlePlay}>Play</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleReset}>Reset</button>
    </section>
  );
};

export default Controls;
