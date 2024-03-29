"use client";

import { useState } from "react";
import { Tab, TabItem } from "./components/Tab";
import { Player, GameSetting } from "@/lib/util";
import { GameSettingTab } from "./components/GameSettingTab";
import { PlayerSettingTab } from "./components/PlayerSettingTab";
import { AppHeader } from "./components/AppHeader";
import { TimerTab } from "./components/TimerTab";
import { defaultSource } from "@/lib/sound";

const TabKindList = {
  PlayerSetting: "playerSetting",
  GameSetting: "gameSetting",
};
type TabKind = (typeof TabKindList)[keyof typeof TabKindList];

export default function Home() {
  const [players, setPlayers] = useState<Player[]>([
    { name: "Player 1", color: "#0000ff", active: true },
    { name: "Player 2", color: "#00ff00", active: false },
    { name: "Player 3", color: "#ff0000", active: false },
    { name: "Player 4", color: "#10500F", active: false },
    { name: "Player 5", color: "#2055FF", active: false },
    { name: "Player 6", color: "#ffff00", active: false },
  ]);

  const defaultGameSetting: GameSetting = {
    span: 5,
    sound: defaultSource,
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
      <main className="flex min-h-screen flex-col items-center justify-between pt-5">
        <Tab tabs={tabs} defaultOpenKey={tabs[0].tabKey} />
      </main>
    </>
  );
}
