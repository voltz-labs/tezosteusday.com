import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";
import { useEffect, useState } from "react";
import { getNextDayOfWeek } from "../functions/getNextDayOfWeek";
import styles from "./index.module.scss";

// Date.now = (() => {
//   const now = new Date();

//   return () => now.getTime();
// })();

const getDifference = () => {
  const now = Date.now();

  return Math.floor((getNextDayOfWeek("Tuesday", now) - now) / 1000);
};

const Home = () => {
  const [seconds, setSeconds] = useState(getDifference());

  useEffect(() => {
    const interval = setInterval(() => {
      const difference = getDifference();

      if (difference != seconds) {
        setSeconds(difference);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const now = Date.now();

  const difference = {
    hours: differenceInHours(now + seconds * 1000, now),
    minutes: differenceInMinutes(now + seconds * 1000, now) % 60,
    seconds: differenceInSeconds(now + seconds * 1000, now) % 60,
  };

  return (
    <div className={styles.root}>
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary border-bottom border-secondary">
          <div className="container-fluid">
            <a
              className={`${styles.brand} navbar-brand fs-1 fw-bolder`}
              href="#"
            >
              #TezosTeusday
            </a>
          </div>
        </nav>
      </header>
      <main className="bg-primary text-white">
        <div className="container-fluid h-100">
          <div className="row">
            <div className="col">
              <div className="pt-5">
                <p className="fw-bold fs-2">Get ready for #TezosTeusday!</p>
              </div>
            </div>
          </div>
          <div className="row h-100">
            <div className="col h-100">
              <div className="h-75 d-flex align-items-center justify-content-center">
                <div className={`${styles.timer}`}>{`${difference.hours
                  .toString()
                  .padStart(2, "0")}:${difference.minutes
                  .toString()
                  .padStart(2, "0")}:${difference.seconds
                  .toString()
                  .padStart(2, "0")}`}</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-primary text-white border-top border-secondary">
        <div className="container-fluid px-5 py-3">
          <div className="d-flex align-items-center justify-content-end">
            GitHub
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
