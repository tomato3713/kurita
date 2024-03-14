import React from "react";

type TimerProps = Readonly<{
  handleRestart: (newExpiryTimestamp: Date, autoStart?: boolean) => void;
  handleStart: () => void;
  handlePause: () => void;
  handleResume: () => void;
  minutes: number;
  seconds: number;
  isRunning: boolean;
}>;
export const Timer: React.FC<TimerProps> = ({
  handlePause,
  handleResume,
  handleRestart,
  minutes,
  seconds,
  isRunning,
}) => {
  return (
    <div className="text-center">
      <div className="text-6xl">
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
