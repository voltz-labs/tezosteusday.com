import {
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";
import { useEffect, useState } from "react";
import { getNextDayOfWeek } from "../functions/getNextDayOfWeek";
import styles from "./index.module.scss";
import { BsTwitter } from "react-icons/bs";

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
    if (typeof window !== undefined) {
      const interval = setInterval(() => {
        const difference = getDifference();

        if (difference != seconds) {
          setSeconds(difference);
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, []);

  const now = Date.now();

  const difference = {
    hours: differenceInHours(now + seconds * 1000, now),
    minutes: differenceInMinutes(now + seconds * 1000, now) % 60,
    seconds: differenceInSeconds(now + seconds * 1000, now) % 60,
  };

  const time = `${difference.hours
    .toString()
    .padStart(2, "0")}:${difference.minutes
    .toString()
    .padStart(2, "0")}:${difference.seconds.toString().padStart(2, "0")}`;

  return (
    <div className={styles.root}>
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary border-bottom border-secondary">
          <div className="container-fluid px-5">
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
        <div className={`${styles.main} container-fluid d-grid pb-5`}>
          <div className="row">
            <div className="col">
              <div className="px-5 pt-5">
                <p className="fw-bold fs-2">Get ready for #TezosTeusday!</p>
              </div>
            </div>
          </div>
          <div className="d-flex flex-column align-items-center justify-content-top">
            <div className="">
              <div className={`${styles.timer}`}>{time}</div>
            </div>
            <div className="">
              <a
                className="btn btn-outline-light py-3 px-5 fs-4 fw-bold d-flex gap-3 align-items-center justify-content-center"
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  "https://tezosteusday.com"
                )}&text=${encodeURIComponent(
                  `I'm ready for #TezosTeusday\n${time} to Tezos Teusday!`
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                <BsTwitter size={48} /> Share
              </a>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-primary text-white border-top border-secondary">
        <div className="container-fluid px-5 py-3">
          <div className="d-flex align-items-center justify-content-end">
            <a className="link-light text-decoration-none" href="#">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
