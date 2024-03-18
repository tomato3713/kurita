import { Howl } from "howler";

export const source = new Map<string, string>([
  ["Sound1", "sound1.mp3"],
  ["Sound2", "sound2.mp3"],
]);

export const defaultSource = Array.from(source.values())[0];

export const New = function (source: string): Howl {
  return new Howl({
    src: source,
    volume: 0.5,
  });
};
