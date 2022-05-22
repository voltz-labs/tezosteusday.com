import { NextApiHandler } from "next";
import { parseFormData } from "../../functions/parseFormData";
import fs from "fs";
import getConfig from "next/config";
import path from "path";
import { songs } from "../../utils/songs";

const handler: NextApiHandler = async (req, res) => {
  const { fields, files } = await parseFormData(req);

  if (fields.apiKey !== process.env.API_KEY) {
    res.status(403).end();

    return;
  }

  await new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(files.song.filepath);

    readStream.on("error", reject);

    const writeStream = fs.createWriteStream(
      path.join(
        getConfig().publicRuntimeConfig.PROJECT_ROOT,
        "public",
        "songs",
        files.song.originalFilename
      )
    );

    writeStream.on("error", reject);

    writeStream.on("finish", resolve);

    readStream.pipe(writeStream);
  });

  const _songs = await fs.promises.readdir(
    path.join(getConfig().publicRuntimeConfig.PROJECT_ROOT, "public", "songs")
  );

  songs.setSongs(_songs);

  res.status(200).json({
    songs: songs.getSongs(),
  });
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
