import React, { useEffect, useState } from "react";
import Button from "./Button";
import UploadToIPFS from "./UploadToIPFS";
import { useSignMessage } from "wagmi";
import { Polybase } from "@polybase/client";
import { Icon } from "@iconify/react";
import Modal from "./Modal";

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
  owner: any;
}

const db = new Polybase({
  defaultNamespace:
    // "pk/0x98550a271a85832718f29cf70384e551b852ada0beec830f9c682b7de22d945ad828dbc50de17194936565d27ef6da583c8e8856d7f27bbd97b34419401e5b47/SoundverseTest3",
    "pk/0x90a457e83a58912e705b11a0d8e9cb7aacadb449ee1a7c68ba244a091448410a751ce1b483798c3352044a472d173f2cd2f65e33b231a868d28b684f33d810ca/testcosmicwave",
});

const FileManager = ({ publicKey }: Props) => {
  const sign = useSignMessage();

  const [songs, setSongs] = useState<Song[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [playlistName, setPlaylistName] = useState<string>(
    "My Amazing Playlist"
  );

  const songsCollection = db.collection<Song>("Song");

  useEffect(() => {
    songsCollection?.onSnapshot((changes) => {
      const songData = changes.data.map((song) => ({
        ...song.data,
        checked: false,
      }));

      setSongs(songData);
    });
  }, [songsCollection]);

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

  const handleCreatePlaylist = async () => {
    setModalIsOpen(false);
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
      .record(playlistName)
      .call("setSongs", [songIds]);

    setPlaylistName("");
  };

  return (
    <>
      <Modal
        modalIsOpen={modalIsOpen}
        setPlaylistName={setPlaylistName}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        commitPlaylist={handleCreatePlaylist}
        closeModal={() => {
          setModalIsOpen(false);
        }}
      />
      <div className="m-1 h-full">
        <div className="flex flex-row place-content-between items-center group py-2">
          <h1 className="text-white text-2xl mb-5">Files</h1>
          <Button
            type="button"
            disabled={songs.length === 0}
            handleClick={() => {
              setModalIsOpen(true);
            }}
          >
            <span className="text-slate-900">Create playlist</span>
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4 w-full">
          <div className="col-span-1"></div>
          <div className="col-span-2">
            <div className="flex m-1 px-6 items-center ">
              {songs.length > 0 && (
                <>
                  <input
                    id="select-all"
                    type="checkbox"
                    value=""
                    className="w-4 h-4focus:ring-2 accent-transparent"
                    onChange={handleSelectAllCheckboxChange}
                  />
                  <label
                    htmlFor="select-all"
                    className="w-full py-3 ml-2 text-sm font-light text-gray-100"
                  >
                    Select all
                  </label>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 w-full h-[70%]">
          <UploadToIPFS publicKey={publicKey} />

          <div className="col-span-2 rounded-md border border-[#424242]  overflow-y overflow-y-auto">
            {songs.length === 0 && (
              <div className="flex flex-col items-center justify-center pt-5 pb-6 h-full">
                <Icon
                  icon="pixelarticons:mood-sad"
                  className="w-8 h-8 text-white m-6"
                />
                <p className="mb-2 text-sm text-gray-100 text-center w-[70%]">
                  Ops, it looks like you don’t have any files yet. Upload files
                  to get started.
                </p>
              </div>
            )}
            <div>
              <ul className="w-full h-full">
                {songs.map((song) => (
                  <li
                    key={song.id}
                    className="w-full flex items-center py-3 hover:bg-[#424242] hover:bg-opacity-50 cursor-pointer pl-7"
                  >
                    <input
                      id={song.id}
                      type="checkbox"
                      checked={song.checked}
                      onChange={handleAddToPlaylistButtonClick}
                      className="w-4 h-4 focus:ring-2 accent-transparent"
                    />
                    <label
                      htmlFor={song.id}
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
    </>
  );
};

export default FileManager;
