import React from "react";

import Button from "@/components/elements/Button";

const PlaylistsLibrary = () => {
  // const playlists = ["playlist1", "playlist2", "playlist3"];
  const playlists: any[] = [];
  // todo - get playlists
  // todo - stream

  const handleStreamButtonClick = () => {};
  return (
    <div className="m-1">
      <h1 className="text-white text-2xl mb-5">Playlists</h1>
      {playlists.length > 0 ? (
        <div>
          <ul>
            {playlists.map((playlist) => (
              <li
                key={playlist}
                className="flex flex-row place-content-between items-center group"
              >
                <h1 className="text-white font-md font-light">{playlist}</h1>
                <Button
                  type="button"
                  handleClick={handleStreamButtonClick}
                  extraClass="opacity-0 group-hover:opacity-100"
                >
                  Stream
                </Button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <h1 className="text-white font-md font-light">
          Looks like you don't have a playlist yet.
        </h1>
      )}
    </div>
  );
};

export default PlaylistsLibrary;
