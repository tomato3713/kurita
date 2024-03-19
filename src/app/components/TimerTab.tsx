import { GameSetting, Player } from "@/lib/util";
import { useMemo, useState } from "react";
import { useTimer } from "react-timer-hook";
import { Timer } from "./Timer";
import { PlayerIcon } from "./PlayerIcon";
import { New } from "@/lib/sound";

type TimerTabProps = Readonly<{
  players: Player[];
  gameSetting: GameSetting;
}>;
export const TimerTab: React.FC<TimerTabProps> = ({ players, gameSetting }) => {
  const [activePlayer, setActivePlayer] = useState(players[0]);
  const sound = useMemo(() => {
    return New(gameSetting.sound);
  }, [gameSetting.sound]);

  const handlePlayerClick = (player: Player) => {
    return () => {
      setActivePlayer(player);
      restart(timestamp, true);
    };
  };

  const now = new Date();
  const timestamp = new Date(now.getTime() + gameSetting.span * 1000);

  const handleExpired = () => {
    sound.play();
  };

  const { seconds, minutes, isRunning, start, pause, resume, restart } =
    useTimer({
      expiryTimestamp: timestamp,
      onExpire: handleExpired,
      autoStart: false,
    });

  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <div className="w-4/12">
          <PlayerIcon player={activePlayer} />
        </div>
        <div className="place-self-center">
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
      </div>
      <div>
        <div className="flex-col">
          {players.map((player) => {
            return (
              <button
                className={`w-1/5 ps-px pr-px ${activePlayer === player && "bg-gray-400"}`}
                key={`timer-player-icon-${player.name}`}
                onClick={handlePlayerClick(player)}
              >
                <PlayerIcon player={player} />
                <div className="text-sm font-light m-0 p-0">{player.name}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
