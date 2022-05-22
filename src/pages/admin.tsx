import { Page } from "../components/Page";
import Head from "next/head";
import React, { useRef } from "react";
import { GetServerSideProps } from "next";
import Teusday from "../components/Teusday";
import { getRandomItem } from "../functions/getRandomItem";

interface AdminProps {
  links: string[] | null;
  song: string;
}

const Admin = ({ links, song }: AdminProps) => {
  const formLinks = useRef();
  const formSongs = useRef();

  const submitLinks = async (e: React.FormEvent) => {
    e.preventDefault();

    const body = new FormData(formLinks.current);

    const response = await fetch("/api/links", {
      method: "POST",
      body,
    });

    if (response.status !== 200) {
      alert("Failed with status " + response.status);

      return;
    }

    const data = await response.json();

    alert("Links set, list of links:\n" + data.links.join("\n"));
  };

  const submitSongs = async (e: React.FormEvent) => {
    e.preventDefault();

    const body = new FormData(formSongs.current);

    const response = await fetch("/api/songs", {
      method: "POST",
      body,
    });

    if (response.status !== 200) {
      alert("Failed with status " + response.status);

      return;
    }

    const data = await response.json();

    alert("Song Added, list of songs:\n" + data.songs.join("\n"));
  };

  if (links) {
    return <Teusday song={song} links={links} />;
  }

  return (
    <>
      <Head>
        <title>Tezos Teusday &bull; Administrator Section</title>
      </Head>
      <Page>
        <div className="container py-5">
          <form id="form-links" onSubmit={submitLinks} ref={formLinks}>
            <div className="form-group mb-3">
              <label htmlFor="form-links-apiKey">API Key</label>
              <input
                className="form-control"
                id="form-links-apiKey"
                name="apiKey"
                type="text"
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="form-links-links">Links</label>
              <textarea
                id="form-links-links"
                name="links"
                className="form-control"
                rows={10}
              ></textarea>
            </div>

            <button className="btn btn-secondary" type="submit">
              Submit
            </button>
          </form>

          <form
            className="py-3"
            id="form-songs"
            onSubmit={submitSongs}
            ref={formSongs}
          >
            <div className="form-group mb-3">
              <label htmlFor="form-songs-apiKey">API Key</label>
              <input
                className="form-control"
                id="form-songs-apiKey"
                name="apiKey"
                type="text"
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="form-songs-song">Song</label>
              <input
                className="form-control"
                id="form-songs-song"
                name="song"
                type="file"
                accept="audio/mp3,audio/*"
              />
            </div>
            <button className="btn btn-secondary" type="submit">
              Submit
            </button>
          </form>

          <form className="py-3" id="form-preview" method="GET">
            <div className="form-group mb-3">
              <label htmlFor="form-preview-apiKey">API Key</label>
              <input
                className="form-control"
                id="form-preview-apiKey"
                name="apiKey"
                type="text"
              />
            </div>
            <button className="btn btn-secondary" type="submit">
              Preview
            </button>
          </form>
        </div>
      </Page>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { apiKey } = query;

  const { links } = await import("../utils/links");
  const { songs } = await import("../utils/songs");

  const song = getRandomItem(songs.getSongs());

  let currentLinks: string[] | null = null;

  if (apiKey === process.env.API_KEY) {
    currentLinks = links.getLinks();
  }

  return {
    props: {
      links: currentLinks,
      song,
    },
  };
};

export default Admin;
