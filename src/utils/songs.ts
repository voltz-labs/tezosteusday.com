import fs from "fs";
import getConfig from "next/config";
import path from "path";

export const songs = fs.readdirSync(
  path.join(getConfig().publicRuntimeConfig.PROJECT_ROOT, "public", "songs")
);
