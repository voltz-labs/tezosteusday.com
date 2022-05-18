import { useEffect, useState } from "react";
import { getSecondsToTuesday } from "../functions/getSecondsToTuesday";
import Teusday from "../components/Teusday";
import Countdown from "../components/Countdown";

const Home = () => {
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
    return <Teusday />;
  }

  return <Countdown seconds={seconds} />;
};

export default Home;
