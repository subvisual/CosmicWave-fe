import React, { useState } from "react";
import Button from "./Button";
import UploadToIPFS from "./UploadToIPFS";

interface Props {
  publicKey: `0x${string}`;
}

const FileManager = ({ publicKey }: Props) => {
  const songsList = [
    { checked: false, name: "song 1", cid: "123123" },
    { checked: false, name: "song 2", cid: "312312" },
    { checked: false, name: "song 3", cid: "434234" },
    { checked: false, name: "song 4", cid: "1231223" },
    { checked: false, name: "song 5", cid: "312382" },
    { checked: false, name: "song 6", cid: "434294" },
    { checked: false, name: "song 7", cid: "1231623" },
    { checked: false, name: "song 8", cid: "3123412" },
    { checked: false, name: "song 9", cid: "43427634" },
  ];

  const [songs, setSongs] = useState(songsList);

  const handleAddToPlaylistButtonClick = (e: any) => {
    const songId = e.target.id;
    const checkedInput = e.target.checked;
    const selectedSong = songs.filter((s) => s.cid === songId);
    const newSongs = selectedSong
      ? [...songs, { ...selectedSong[0], checked: checkedInput }]
      : songs;
    setSongs(newSongs);
  };

  const handleSelectAllCheckboxChange = (e: any) => {
    const checkedInput = e.target.checked;
    const newSongs = songs.map((s) => ({ ...s, checked: checkedInput }));
    setSongs(newSongs);
  };

  return (
    <div className="m-1 h-96">
      <div className="flex flex-row place-content-between items-center group">
        <h1 className="text-white text-2xl mb-5">Files</h1>
        <Button type="button" handleClick={handleAddToPlaylistButtonClick}>
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
                  key={song.cid}
                  className="w-full flex items-center py-3 hover:bg-slate-700 hover:bg-opacity-50 cursor-pointer pl-7"
                >
                  <input
                    id={song.cid}
                    type="checkbox"
                    checked={song.checked}
                    onChange={handleAddToPlaylistButtonClick}
                    className="w-4 h-4 focus:ring-2 accent-transparent"
                  />
                  <label
                    htmlFor="vue-checkbox"
                    className="w-full py-3 ml-2 text-sm font-light text-gray-100"
                  >
                    {song.name}
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
