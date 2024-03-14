import { Player } from "@/lib/util";
import { PlayerIcon } from "./PlayerIcon";
import { ColorPickerIcon } from "./ColorPickerIcon";

type PlayerSettingTabProps = Readonly<{
  players: Player[];
  setPlayers: (players: Player[]) => unknown;
}>;
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
    <div>
      <ul className="flex flex-wrap">
        {players.map((p, idx) => {
          return (
            <li key={p.name} className="w-1/5 ps-px pr-px">
              <div
                className={`items-center text-center mb-px px-1 ${p.active && "bg-gray-400"}`}
              >
                <input
                  id={"player-checkbox-items-" + idx.toString()}
                  type="checkbox"
                  value=""
                  className="hidden"
                  checked={p.active}
                  onChange={createUpdatePlayerActiveFunction(idx)}
                />
                <label htmlFor={"player-checkbox-items-" + idx.toString()}>
                  <div className="text-sm font-light">{p.name}</div>
                  <PlayerIcon player={p} />
                </label>
                <input
                  id={`colorpicker-items-${p.name}`}
                  type="color"
                  className="hidden"
                  value={p.color}
                  onChange={(e) => {
                    const updateColor = createUpdatePlayerColorFunction(idx);
                    updateColor(e.target.value);
                  }}
                />
                <label
                  htmlFor={`colorpicker-items-${p.name}`}
                  className="inline-block justify-center w-2/5"
                >
                  <ColorPickerIcon />
                </label>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
