import fs from "fs";
import getConfig from "next/config";
import path from "path";

const LINKS_FILEPATH = path.join(
  getConfig().publicRuntimeConfig.PROJECT_ROOT,
  "public",
  "links.txt"
);

let _links = fs.existsSync(LINKS_FILEPATH)
  ? fs.readFileSync(LINKS_FILEPATH).toString().split("\n")
  : [];

export const links = {
  getLinks: () => {
    return _links;
  },
  setLinks: (links: string[]) => {
    _links = links;
  },
};
