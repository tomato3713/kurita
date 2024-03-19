import { Howl } from "howler";

export const source = new Map<string, string>([
  ["SoundA", "sound1.mp3"],
  ["SoundB", "sound2.mp3"],
]);

export const defaultSource = Array.from(source.values())[0];

export const New = function (source: string): Howl {
  return new Howl({
    src: source,
    volume: 0.5,
  });
};
