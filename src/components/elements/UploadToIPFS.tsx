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

const UploadToIPFS = ({ publicKey }: Props) => {
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

    if (error) {
      console.log(error);
    }

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
    <div className="col-span-1 px-6 py-2 m-2 rounded-md border border-slate-100 border-opacity-50">
      <div className="w-full h-full">
        <h1 className="text-white">Upload</h1>
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <p className="mb-2 text-sm text-gray-100">
              <span className="font-semibold">Click to upload</span> or drag
              and drop
            </p>
            <p className="text-xs text-gray-100">MP3 or WAV</p>
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
    </div>
  );
};

export default UploadToIPFS;
