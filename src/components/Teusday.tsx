import { useEffect, useState, useRef } from "react";
import { Page } from "./Page";
import Confetti from "react-confetti";
import Head from "next/head";

interface TeusdayProps {
  song: string;
  links: string[];
}

const Teusday = ({ song, links }: TeusdayProps) => {
  const [confetti, setConfetti] = useState<{
    height: number;
    width: number;
  } | null>(null);
  const [show, setShow] = useState(false);
  const [play, setPlay] = useState(false);
  const [currentSong, setCurrentSong] = useState(song);
  const audio = useRef<HTMLAudioElement>();

  useEffect(() => {
    if (typeof window !== "undefined" && show) {
      setConfetti({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }
  }, [show]);

  useEffect(() => {
    if (typeof window !== "undefined" && show) {
      setPlay(true);
    }
  }, [show]);

  useEffect(() => {
    if (typeof window !== "undefined" && show) {
      if (audio.current) {
        audio.current.play();
      }
    }
  }, [show]);

  if (!show) {
    return (
      <>
        <Head>
          <title>Tezos Teusday</title>
        </Head>
        <Page>
          <div className="h-100 d-flex align-items-center justify-content-center">
            <button
              className="btn btn-secondary btn-lg display-1 fw-bolder"
              onClick={() => setShow(true)}
            >
              Click to see
            </button>
          </div>
        </Page>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Tezos Teusday</title>
      </Head>
      <Page>
        {confetti && (
          <Confetti
            width={confetti.width}
            height={confetti.height}
            opacity={0.9}
            colors={["#ef2964", "#00c09d", "#2d87b0", "#48485e", "#efff1d"]}
          />
        )}
        {play && (
          <audio
            ref={audio}
            src={`/songs/${encodeURIComponent(currentSong)}`}
            autoPlay
            onEnded={async () => {
              const response = await fetch(
                `/api/song?exclude=${encodeURIComponent(currentSong)}`
              );

              const data = await response.json();

              setCurrentSong(data.song);
            }}
          />
        )}
        <div className="py-3">
          <marquee>
            <span className="text-light">Current Song: {currentSong}</span>
          </marquee>
        </div>
        <div className="text-white d-flex align-items-center justify-content-center">
          <ul className="display-2 lh-4 list-unstyled">
            {links.map((link, index) => (
              <li key={index} className="py-5 text-center">
                <a
                  className="text-decoration-none fw-bold"
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    animation: `colorchange-${
                      (index % 11) + 1
                    } 20s infinite alternate`,
                  }}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Page>
    </>
  );
};

export default Teusday;
