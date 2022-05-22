import Head from "next/head";
import { BsTwitter } from "react-icons/bs";
import { getTimeFromSeconds } from "../functions/getTimeFromSeconds";
import styles from "./Countdown.module.scss";
import { Page } from "./Page";

export interface CountdownProps {
  seconds: number;
}

const Countdown = ({ seconds }: CountdownProps) => {
  const time = getTimeFromSeconds(seconds);

  const message = `Get ready for the next @TezosTuesday. Only ${time.format()} hours to go! #TezosTuesday #Tezos.`;

  return (
    <>
      <Head>
        <title>Tezos Tuesday &bull; {time.format()}</title>
      </Head>
      <Page>
        <div className={`${styles.main} container-fluid d-grid pb-5`}>
          <div className="row">
            <div className="col">
              <div className="px-5 pt-5">
                <p className="fw-bold fs-2">Get ready for #TezosTuesday!</p>
              </div>
            </div>
          </div>
          <div className="d-flex flex-column align-items-center justify-content-start">
            <div suppressHydrationWarning className={`${styles.timer}`}>
              {time.format()}
            </div>
            <div className="d-flex w-100 px-5 align-items-center justify-content-center">
              <a
                suppressHydrationWarning
                className="btn btn-outline-light py-3 px-5 fs-4 fw-bold d-flex gap-3 align-items-center justify-content-center"
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  "https://tezostuesday.com"
                )}&text=${encodeURIComponent(message)}`}
                target="_blank"
                rel="noreferrer"
              >
                <BsTwitter size={48} /> Share
              </a>
            </div>
            <div className="d-flex d-md-none pt-5">
              <a
                className="twitter-timeline"
                data-width="80vw"
                data-height="250"
                href="https://twitter.com/TezosTuesday"
              >
                A Twitter List by TezosTuesday
              </a>
              <script
                async
                src="https://platform.twitter.com/widgets.js"
                charSet="utf-8"
              ></script>
            </div>
          </div>
        </div>
      </Page>
    </>
  );
};

export default Countdown;
