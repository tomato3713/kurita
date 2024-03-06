"use client";

import { useState } from "react";
import { Tab, TabItem } from "./components/Tab";

type TimerTabProps = {};
const TimerTab: React.FC<TimerTabProps> = ({}) => {
  return <div className="timer-tab">timer tab</div>;
};

type GameSettingTabProps = {};
const GameSettingTab: React.FC<GameSettingTabProps> = ({}) => {
  return <div className="game-setting-tab">Game setting</div>;
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
    <>
      <h1 className="mb-2 text-4xl font-bold text-center">Kurita</h1>
      <span className="mb-2 font-semibold text-center">
        Kurita is a timer for board game.
      </span>
    </>
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
};

const TabKindList = {
  PlayerSetting: "playerSetting",
  GameSetting: "gameSetting",
};
type TabKind = (typeof TabKindList)[keyof typeof TabKindList];

export default function Home() {
  const [players, setPlayers] = useState([
    { name: "1", color: "#0000ff" },
    { name: "2", color: "#00ff00" },
    { name: "3", color: "#ff0000" },
    { name: "4", color: "#10500F" },
  ]);

  const tabs: TabItem[] = [
    {
      tabKey: "playerSetting",
      title: "Player Setting",
      content: <PlayerSettingTab players={players} setPlayers={setPlayers} />,
    },
    {
      tabKey: "gameSetting",
      title: "Game Setting",
      content: <GameSettingTab />,
    },
    { tabKey: "timer", title: "Timer", content: <TimerTab /> },
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
