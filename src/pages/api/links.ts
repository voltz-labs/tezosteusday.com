import { NextApiHandler } from "next";
import { parseFormData } from "../../functions/parseFormData";
import fs from "fs";
import getConfig from "next/config";
import path from "path";
import { links } from "../../utils/links";

const handler: NextApiHandler = async (req, res) => {
  const { fields } = await parseFormData(req);

  if (fields.apiKey !== process.env.API_KEY) {
    res.status(403).end();

    return;
  }

  await fs.promises.writeFile(
    path.join(
      getConfig().publicRuntimeConfig.PROJECT_ROOT,
      "public",
      "links.txt"
    ),
    fields.links
  );

  links.setLinks(fields.links.split("\n"));

  res.status(200).json({
    links: links.getLinks(),
  });
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
