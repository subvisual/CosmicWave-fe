import React, { useEffect, useState } from "react";
import * as musicMetadata from "music-metadata-browser";
import useHelia from "@/hooks/useHelia";
import useDrand from "@/hooks/useDrand";
import { Polybase } from "@polybase/client";
import { useSignMessage } from "wagmi";

interface Props {
  publicKey: `0x${string}`;
}

const db = new Polybase({
  defaultNamespace:
    // "pk/0x98550a271a85832718f29cf70384e551b852ada0beec830f9c682b7de22d945ad828dbc50de17194936565d27ef6da583c8e8856d7f27bbd97b34419401e5b47/SoundverseTest3",
    "pk/0x90a457e83a58912e705b11a0d8e9cb7aacadb449ee1a7c68ba244a091448410a751ce1b483798c3352044a472d173f2cd2f65e33b231a868d28b684f33d810ca/testcosmicwave",
});

const UploadFile = ({ publicKey }: Props) => {
  const [song, setSong] = useState<
    | {
        cid: string;
        title: string;
        artist: string;
        filename: string;
        duration: number;
      }
    | undefined
  >(undefined);
  const [error, setError] = useState<any>(null);

  const helia = useHelia();
  const { drandNode, getRandomness } = useDrand();
  const sign = useSignMessage();

  useEffect(() => {
    if (!song) return;

    const addSong = async () => {
      if (!drandNode)
        throw new Error(
          "drandNode not initialized. Unable to generate record id"
        );
      const randInt = await getRandomness();
      console.log("randint", randInt);

      db.signer(async (data) => {
        return {
          h: "eth-personal-sign",
          sig: await sign.signMessageAsync({ message: data }),
        };
      });

      await db
        .collection("Song")
        .create([
          song.cid,
          song.title,
          song.artist,
          song.filename,
          song.duration,
          db.collection("Streamer").record(publicKey),
        ])
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          setError(err);
        });
    };
    if (song) {
      void addSong();
    }
  }, [song]);

  const captureFile = async (file: any) => {
    const _metadata = await musicMetadata.parseBlob(file);

    try {
      const fileCid = await helia.uploadFile(file);
      setSong({
        cid: fileCid,
        title: "title",
        artist: "artist",
        filename: file.name,
        duration: _metadata.format.duration!,
      });
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    void captureFile(event.target.files[0]);
  };

  return (
    <div>
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              aria-hidden="true"
              className="w-10 h-10 mb-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              MP3 or WAV
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            accept=".mp3,audio/*"
            onChange={(e) => {
              handleSubmit(e);
            }}
          />
        </label>
      </div>

      {song && (
        <div className="my-4">
          <a
            id="gateway-link"
            target="_blank"
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            href={`https://127.0.0.1:5001/ipfs/${song.cid}`}
            rel="noreferrer"
            className="inline-flex items-center justify-center p-5 text-base font-medium text-gray-500 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="w-full mr-3">
              <span className="font-bold">CID</span> {song.cid}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
          </a>
        </div>
      )}

      {error && (
        <div className="bg-red pa3 center mv3 white">
          Error: {error.message || error}
        </div>
      )}
    </div>
  );
};

export default UploadFile;
