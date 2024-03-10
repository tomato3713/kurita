export type PlayerSettingTabProps = {
  players: Player[];
  setPlayers: (players: Player[]) => unknown;
};
import { Player } from "@/lib/util";
import { PlayerIcon } from "./PlayerIcon";
import { ColorPicker } from "./ColorPicker";

export const PlayerSettingTab: React.FC<PlayerSettingTabProps> = ({
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
