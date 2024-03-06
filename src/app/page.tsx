"use client";

import { useState } from "react";

function AppHeader() {
  return (
    <div className="relative place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
      <h1 className="mb-2 text-4xl font-bold text-center">Kurita</h1>
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
};

export default function Home() {
  const [players, setPlayers] = useState([
    { name: "1", color: "#0000ff" },
    { name: "2", color: "#00ff00" },
    { name: "3", color: "#ff0000" },
    { name: "4", color: "#10500F" },
  ]);

  const createUpdatePlayerColorFunction = (targetIdx: number) => {
    return (color: string) => {
      const obj = { ...players[targetIdx], color: color };
      setPlayers(players.map((p, i) => (i === targetIdx ? obj : p)));
    };
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <AppHeader />
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
    </main>
  );
}
