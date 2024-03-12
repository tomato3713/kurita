import { GameSetting, Player } from "@/lib/util";
import { useState } from "react";
import { useTimer } from "react-timer-hook";
import { Timer } from "./Timer";
import { PlayerIcon } from "./PlayerIcon";

type TimerTabProps = Readonly<{
  players: Player[];
  gameSetting: GameSetting;
}>;
export const TimerTab: React.FC<TimerTabProps> = ({ players, gameSetting }) => {
  const [activePlayer, setActivePlayer] = useState(players[0]);

  const handlePlayerClick = (player: Player) => {
    return () => {
      setActivePlayer(player);
      restart(timestamp, true);
    };
  };

  const now = new Date();
  const timestamp = new Date(now.getTime() + gameSetting.span * 1000);

  const handleExpired = () => {
    console.log("expired");
  };

  const { seconds, minutes, isRunning, start, pause, resume, restart } =
    useTimer({
      expiryTimestamp: timestamp,
      onExpire: handleExpired,
      autoStart: false,
    });

  return (
    <div className="timer-tab">
      timer tab
      <div>Timer</div>
      <div>{gameSetting.span} min</div>
      <div>
        <PlayerIcon player={activePlayer} />
        <Timer
          minutes={minutes}
          seconds={seconds}
          isRunning={isRunning}
          handleStart={start}
          handlePause={pause}
          handleResume={resume}
          handleRestart={restart}
        />
      </div>
      <div className="flex">
        {players.map((player) => {
          return (
            <button
              key={`timer-player-icon-${player.name}`}
              onClick={handlePlayerClick(player)}
            >
              <PlayerIcon player={player} />
            </button>
          );
        })}
      </div>
    </div>
  );
};
