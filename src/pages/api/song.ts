import { NextApiHandler } from "next";
import { getRandomItem } from "../../functions/getRandomItem";
import { songs } from "../../utils/songs";

const handler: NextApiHandler = (req, res) => {
  const { exclude } = req.query;

  const song = getRandomItem(songs.filter((s) => s !== exclude));

  res.status(200).json({ song });
};

export default handler;
