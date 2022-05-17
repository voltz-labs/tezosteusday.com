import { getRandom } from "./getRandom";

export const getRandomItem = <T>(items: T[]) =>
  items[getRandom(0, items.length)];
