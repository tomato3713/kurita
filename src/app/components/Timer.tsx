import React from "react";

type TimerProps = {
  handleReset: () => void;
  handleStart: () => void;
  handlePause: () => void;
  handleResume: () => void;
  minutes: number;
  seconds: number;
  isRunning: boolean;
};
export const Timer: React.FC<TimerProps> = ({
  handlePause,
  handleResume,
  minutes,
  seconds,
  isRunning,
}) => {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "100px" }}>
        <button
          onClick={() => {
            isRunning ? handlePause() : handleResume();
          }}
        >
          <span>{minutes}</span>:<span>{seconds}</span>
        </button>
      </div>
      <p>{isRunning ? "Running" : "Not running"}</p>
    </div>
  );
};
