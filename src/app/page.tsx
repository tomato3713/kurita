"use client";

import { useState } from "react";
import { Tab, TabItem } from "./components/Tab";
import { Timer } from "./components/Timer";
import { useTimer } from "react-timer-hook";

type TimerTabProps = {
  players: Player[];
  gameSetting: GameSetting;
};
const TimerTab: React.FC<TimerTabProps> = ({ players, gameSetting }) => {
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

type GameSettingTabProps = {
  gameSetting: GameSetting;
  setGameSetting: (obj: GameSetting) => unknown;
};
const GameSettingTab: React.FC<GameSettingTabProps> = ({
  gameSetting,
  setGameSetting,
}) => {
  const handleUpdateSpan = (e: any) => {
    setGameSetting({ ...gameSetting, span: e.target.value });
  };
  const handleIncrementSpan = () => {
    setGameSetting({ ...gameSetting, span: gameSetting.span + 1 });
  };
  const handleDecrementSpan = () => {
    setGameSetting({ ...gameSetting, span: gameSetting.span - 1 });
  };

  return (
    <div className="game-setting-tab">
      <form className="max-w-xs mx-auto">
        <label
          htmlFor="quantity-input"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Choose Max Time
        </label>
        <div className="relative flex items-center max-w-[8rem]">
          <button
            type="button"
            id="decrement-button"
            onClick={handleDecrementSpan}
            className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
          >
            <svg
              className="w-3 h-3 text-gray-900 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 2"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h16"
              />
            </svg>
          </button>
          <input
            type="text"
            id="quantity-input"
            data-input-counter
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="999"
            value={gameSetting.span}
            onInput={handleUpdateSpan}
            required
          />
          <button
            type="button"
            id="increment-button"
            onClick={handleIncrementSpan}
            className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
          >
            <svg
              className="w-3 h-3 text-gray-900 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

type PlayerSettingTabProps = {
  players: Player[];
  setPlayers: (players: Player[]) => unknown;
};
const PlayerSettingTab: React.FC<PlayerSettingTabProps> = ({
  players,
  setPlayers,
}) => {
  const createUpdatePlayerColorFunction = (targetIdx: number) => {
    return (color: string) => {
      const obj = { ...players[targetIdx], color: color };
      setPlayers(players.map((p, i) => (i === targetIdx ? obj : p)));
    };
  };

  const createUpdatePlayerActiveFunction = (targetIdx: number) => {
    return () => {
      const obj = { ...players[targetIdx], active: !players[targetIdx].active };
      setPlayers(players.map((p, i) => (i === targetIdx ? obj : p)));
    };
  };

  return (
    <div className="player-setting-tab">
      <ul>
        {players.map((p, idx) => {
          return (
            <li key={p.name}>
              <div className="flex items-center mb-4">
                <input
                  id={"player-checkbox-items-" + idx.toString()}
                  type="checkbox"
                  value=""
                  className="w-4 h-4"
                  checked={p.active}
                  onChange={createUpdatePlayerActiveFunction(idx)}
                ></input>
                <label htmlFor={"player-checkbox-items-" + idx.toString()}>
                  <PlayerIcon player={p} />
                </label>
                <ColorPicker
                  color={p.color}
                  setColor={createUpdatePlayerColorFunction(idx)}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

function AppHeader() {
  return (
    <div className="text-center">
      <h1 className="mb-2 mt-5 text-4xl font-bold text-center">Kurita</h1>
      <span className="mb-2 font-semibold text-center">
        Kurita is a timer for board game.
      </span>
    </div>
  );
}

type ColorPickerProps = {
  color: string;
  setColor: (color: string) => unknown;
};
const ColorPicker: React.FC<ColorPickerProps> = ({ color, setColor }) => {
  return (
    <div className="flex justify-center space-x-2">
      <input
        id="nativeColorPicker1"
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
    </div>
  );
};

type PlayerIconProps = {
  player: Player;
};
const PlayerIcon: React.FC<PlayerIconProps> = ({ player }) => {
  return (
    <div className={`mb-1 mt-1 mr-1 text-2xl font-semibold items-center`}>
      Palyer {player.name}
    </div>
  );
};

/*
 * Player has properties of player.
 */
type Player = {
  name: string;
  color: string;
  active: boolean;
};

type GameSetting = {
  span: number;
};

const TabKindList = {
  PlayerSetting: "playerSetting",
  GameSetting: "gameSetting",
};
type TabKind = (typeof TabKindList)[keyof typeof TabKindList];

export default function Home() {
  const [players, setPlayers] = useState([
    { name: "1", color: "#0000ff", active: true },
    { name: "2", color: "#00ff00", active: false },
    { name: "3", color: "#ff0000", active: false },
    { name: "4", color: "#10500F", active: false },
  ]);

  const defaultGameSetting: GameSetting = {
    span: 5,
  };
  const [gameSetting, setGameSetting] =
    useState<GameSetting>(defaultGameSetting);

  const tabs: TabItem[] = [
    {
      tabKey: "playerSetting",
      title: "Player Setting",
      content: <PlayerSettingTab players={players} setPlayers={setPlayers} />,
    },
    {
      tabKey: "gameSetting",
      title: "Game Setting",
      content: (
        <GameSettingTab
          gameSetting={gameSetting}
          setGameSetting={setGameSetting}
        />
      ),
    },
    {
      tabKey: "timer",
      title: "Timer",
      content: (
        <TimerTab
          players={players.filter((p) => p.active)}
          gameSetting={gameSetting}
        />
      ),
    },
  ];

  return (
    <>
      <AppHeader />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Tab tabs={tabs} defaultOpenKey={tabs[0].tabKey} />
      </main>
    </>
  );
}
