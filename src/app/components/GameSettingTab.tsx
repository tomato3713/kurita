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
    <div className="w-10/12">
      <form className="grid grid-cols-2 gap-2 place-content-stretch place-items-stretch">
        <legend className="place-self-end text-lg">Select sound type</legend>
        <div className="flex">
          {Array.from(source.keys()).map((v) => {
            return (
              <div
                key={`sound-type-${v}`}
                className={`grow px-0 mx-1 text-center ${gameSetting.sound === source.get(v) ? "bg-blue-700 text-gray-100 font-bold" : "bg-blue-200 text-gray-950"}`}
              >
                <input
                  className="hidden"
                  type="radio"
                  id={`sound-type-${v}`}
                  name="sound-type"
                  value={source.get(v)}
                  onChange={handleUpdateSoundType}
                  checked={gameSetting.sound === source.get(v)}
                />
                <label
                  htmlFor={`sound-type-${v}`}
                  className="inline-block w-full m-0"
                >
                  {v}
                </label>
              </div>
            );
          })}
        </div>

        <legend className="place-self-end mb-2 text-lg text-gray-900 dark:text-white">
          Choose Max Time
        </legend>
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
