import { useEffect, useState } from "react";
import { getSecondsToTuesday } from "../functions/getSecondsToTuesday";
import Teusday from "../components/Teusday";
import Countdown from "../components/Countdown";
import { GetServerSideProps } from "next";
import { songs } from "../utils/songs";
import { getRandomItem } from "../functions/getRandomItem";

interface HomeProps {
  song: string;
  links: string[];
}

const Home = ({ song, links }: HomeProps) => {
  const [seconds, setSeconds] = useState(getSecondsToTuesday());

  useEffect(() => {
    if (typeof window !== undefined) {
      const interval = setInterval(() => {
        const difference = getSecondsToTuesday();

        if (difference != seconds) {
          setSeconds(difference);
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, [seconds]);

  if (seconds === 0) {
    return <Teusday song={song} links={links} />;
  }

  return <Countdown seconds={seconds} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const song = getRandomItem(songs.getSongs());
  const isTuesday = getSecondsToTuesday() === 0;

  const { links } = await import("../utils/links");

  let currentLinks = [];

  if (isTuesday) {
    currentLinks = links.getLinks();
  }

  return {
    props: {
      song,
      links: currentLinks,
    },
  };
};

export default Home;
