import { Howl } from "howler";

export const New = function (): Howl {
  return new Howl({
    src: ["sound1.mp3", "sound2.mp3"],
    volume: 0.5,
  });
};
