import React from "react";
import Button from "./Button";

const FileManager = () => {
  const songs = [
    { name: "song 1", cid: "123123" },
    { name: "song 2", cid: "312312" },
    { name: "song 3", cid: "434234" },
    { name: "song 4", cid: "123123" },
    { name: "song 5", cid: "312382" },
    { name: "song 6", cid: "434294" },
    { name: "song 7", cid: "1231623" },
    { name: "song 8", cid: "3123412" },
    { name: "song 9", cid: "43427634" },
  ];

  const handleAddToPlaylistButtonClick = () => {};
  const handleSelectAllCheckboxChange = () => {};
  const handleSubmitFiles = () => {};

  const checkedSongs = [];

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
          <div className="flex m-1 px-6 items-center">
            <input
              id=""
              type="checkbox"
              value=""
              className="w-4 h-4focus:ring-2"
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
                  handleSubmitFiles(e);
                }}
              />
            </label>
          </div>
        </div>

        <div className="col-span-2 rounded-md border border-slate-100 border-opacity-50 overflow-y overflow-y-auto h-64">
          <div>
            <ul className="w-full">
              {songs.map((song) => (
                <li
                  key={song.cid}
                  className="w-full flex items-center py-3 hover:bg-slate-700 hover:bg-opacity-50 cursor-pointer pl-7"
                >
                  <input
                    id=""
                    type="checkbox"
                    value=""
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
