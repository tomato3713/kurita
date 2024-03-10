"use client";
import { Player } from "@/lib/util";

export type PlayerIconProps = {
  player: Player;
};
export const PlayerIcon: React.FC<PlayerIconProps> = ({ player }) => {
  return (
    <div className={`mb-1 mt-1 mr-1 text-2xl font-semibold items-center`}>
      Palyer {player.name}
    </div>
  );
};
