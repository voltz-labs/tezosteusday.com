import { useEffect, useState } from "react";
import { Page } from "./Page";
import Confetti from "react-confetti";

const Teusday = () => {
  const [confetti, setConfetti] = useState<{
    height: number;
    width: number;
  } | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setConfetti({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }
  }, []);

  return (
    <Page>
      {confetti && (
        <Confetti
          width={confetti.width}
          height={confetti.height}
          opacity={0.9}
          colors={["#ef2964", "#00c09d", "#2d87b0", "#48485e", "#efff1d"]}
        />
      )}
    </Page>
  );
};

export default Teusday;
