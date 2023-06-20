import React, { useEffect, useState } from "react";
import Button from "./Button";
import UploadToIPFS from "./UploadToIPFS";
import useDatabase from "@/hooks/useDatabase";
import { useSignMessage } from "wagmi";
import { Polybase } from "@polybase/client";

interface Props {
  publicKey: `0x${string}`;
}

interface Song {
  id: string;
  title: string;
  artist: string;
  filename: string;
  duration: number;
  checked: boolean;
  owner: Object;
}

const db = new Polybase({
  defaultNamespace:
    "pk/0x98550a271a85832718f29cf70384e551b852ada0beec830f9c682b7de22d945ad828dbc50de17194936565d27ef6da583c8e8856d7f27bbd97b34419401e5b47/SoundverseTest3",
});

const FileManager = ({ publicKey }: Props) => {
  const { getSongs } = useDatabase(publicKey);
  const sign = useSignMessage();

  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    getSongs()
      .then((songs) => {
        if (!songs) {
          return;
        }

        const songData = songs.map((song) => ({ ...song, checked: false }));

        setSongs(songData);
      })
      .catch(console.error);
  }, []);

  const handleAddToPlaylistButtonClick = (e: any) => {
    const songId = e.target.id;
    const checkedInput = e.target.checked;
    const newSongs = songs.map((song) =>
      song.id === songId ? { ...song, checked: checkedInput } : song
    );
    setSongs(newSongs);
  };

  const handleSelectAllCheckboxChange = (e: any) => {
    const checkedInput = e.target.checked;
    const newSongs = songs.map((s) => ({ ...s, checked: checkedInput }));
    setSongs(newSongs);
  };

  const handleAddToPlaylist = async () => {
    db.signer(async (data) => {
      return {
        h: "eth-personal-sign",
        sig: await sign.signMessageAsync({ message: data }),
      };
    });

    const songIds = songs
      .filter((s) => !!s.checked)
      .map((song) => db.collection("Song").record(song.id));

    console.log(songIds);

    await db
      .collection("Playlist")
      .record("My Amazing Playlist")
      .call("setSongs", [songIds]);
  };

  return (
    <div className="m-1 h-96">
      <div className="flex flex-row place-content-between items-center group">
        <h1 className="text-white text-2xl mb-5">Files</h1>
        <Button type="button" handleClick={handleAddToPlaylist}>
          <span className="text-slate-900">Add to playlist</span>
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4 w-full">
        <div className="col-span-1"></div>
        <div className="col-span-2">
          <div className="flex m-1 px-6 items-center ">
            <input
              id=""
              type="checkbox"
              value=""
              className="w-4 h-4focus:ring-2 accent-transparent"
              onChange={handleSelectAllCheckboxChange}
            />
            <label
              htmlFor="vue-checkbox"
              className="w-full py-3 ml-2 text-sm font-light text-gray-100"
            >
              Select all
            </label>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 w-full h-64">
        <UploadToIPFS publicKey={publicKey} />

        <div className="col-span-2 rounded-md border border-slate-100 border-opacity-50 overflow-y overflow-y-auto h-64">
          <div>
            <ul className="w-full">
              {songs.map((song) => (
                <li
                  key={song.id}
                  className="w-full flex items-center py-3 hover:bg-slate-700 hover:bg-opacity-50 cursor-pointer pl-7"
                >
                  <input
                    id={song.id}
                    type="checkbox"
                    checked={song.checked}
                    onChange={handleAddToPlaylistButtonClick}
                    className="w-4 h-4 focus:ring-2 accent-transparent"
                  />
                  <label
                    htmlFor="vue-checkbox"
                    className="w-full py-3 ml-2 text-sm font-light text-gray-100"
                  >
                    {song.filename}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileManager;
