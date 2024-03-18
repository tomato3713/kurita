import { source } from "@/lib/sound";
import { GameSetting } from "@/lib/util";

type GameSettingTabProps = Readonly<{
  gameSetting: GameSetting;
  setGameSetting: (obj: GameSetting) => unknown;
}>;

export const GameSettingTab: React.FC<GameSettingTabProps> = ({
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

  const handleUpdateSoundType = (e: { target: { value: string } }) => {
    setGameSetting({ ...gameSetting, sound: e.target.value });
  };

  return (
    <div className="game-setting-tab">
      <form className="max-w-xs mx-auto">
        <fieldset>
          <legend>Select sound type</legend>
          <div>
            {Array.from(source.keys()).map((v) => {
              return (
                <>
                  <input
                    type="radio"
                    id={`sound-type-${v}`}
                    name="sound-type"
                    value={source.get(v)}
                    onChange={handleUpdateSoundType}
                    checked={gameSetting.sound === source.get(v)}
                  />
                  <label htmlFor={`sound-type-${v}`}>Sound1</label>
                </>
              );
            })}
          </div>
        </fieldset>

        <fieldset>
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
        </fieldset>
      </form>
    </div>
  );
};
