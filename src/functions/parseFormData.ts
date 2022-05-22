import { File, IncomingForm } from "formidable";
import { NextApiRequest } from "next";

type ExcludeFile<T> = {
  [K in keyof T]: T[K] extends File ? never : K;
}[keyof T];

type ToFile<T> = Omit<T, ExcludeFile<T>>;

export const parseFormData = async <T = Record<string, any>>(
  req: NextApiRequest
) =>
  new Promise<{ fields: Record<string, any>; files: ToFile<T> }>(
    (resolve, reject) => {
      const form = new IncomingForm();

      form.parse(req, (err, fields: any, files: any) => {
        if (err) {
          return reject(err);
        }

        return resolve({ fields, files });
      });
    }
  );
