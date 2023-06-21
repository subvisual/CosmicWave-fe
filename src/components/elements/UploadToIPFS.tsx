import React, { useEffect, useState } from "react";
import * as musicMetadata from "music-metadata-browser";
import useHelia from "@/hooks/useHelia";
import useDrand from "@/hooks/useDrand";
import { Polybase } from "@polybase/client";
import { useSignMessage } from "wagmi";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { Icon } from "@iconify/react";

interface Props {
  publicKey: `0x${string}`;
}

const db = new Polybase({
  defaultNamespace:
    // "pk/0x98550a271a85832718f29cf70384e551b852ada0beec830f9c682b7de22d945ad828dbc50de17194936565d27ef6da583c8e8856d7f27bbd97b34419401e5b47/SoundverseTest3",
    "pk/0x90a457e83a58912e705b11a0d8e9cb7aacadb449ee1a7c68ba244a091448410a751ce1b483798c3352044a472d173f2cd2f65e33b231a868d28b684f33d810ca/testcosmicwavedemo",
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
  const [loading, setLoading] = useState<boolean>(false);
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
    setLoading(false);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    setLoading(true);
    void captureFile(event.target.files[0]);
  };

  return (
    <div className="col-span-1 px-6 py-2 rounded-md border border-[#424242] ">
      <div className="w-full h-full">
        {!loading && (
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <ArrowUpTrayIcon className="w-8 h-8 text-white m-6" />
              <p className="mb-2 text-sm text-gray-100 text-center">
                Click to upload or drag and drop
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
        )}
        {loading && (
          <div className="flex h-full w-full items-center justify-center">
            <Icon
              icon="mingcute:loading-3-line"
              className="text-white h-12 w-12 animate-[spin_3s_linear_infinite]"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadToIPFS;
