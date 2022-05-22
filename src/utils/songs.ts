import fs from "fs";
import getConfig from "next/config";
import path from "path";

const SONGS_DIRECTORY = path.join(
  getConfig().publicRuntimeConfig.PROJECT_ROOT,
  "public",
  "songs"
);

let _songs = fs
  .readdirSync(SONGS_DIRECTORY)
  .filter((file) => file !== ".gitkeep");

export const songs = {
  getSongs: () => {
    return _songs;
  },
  setSongs: (songs: string[]) => {
    _songs = songs.filter((file) => file !== ".gitkeep");
  },
};
