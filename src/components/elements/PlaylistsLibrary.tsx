import React, { useEffect } from "react";

import Button from "@/components/elements/Button";
import { Polybase } from "@polybase/client";

interface ForeignKey {
  collection_id: string;
  id: string;
}

interface Playlist {
  id: string;
  songs: ForeignKey[];
  owner: ForeignKey;
}

const db = new Polybase({
  defaultNamespace:
    "pk/0x98550a271a85832718f29cf70384e551b852ada0beec830f9c682b7de22d945ad828dbc50de17194936565d27ef6da583c8e8856d7f27bbd97b34419401e5b47/SoundverseTest3",
});

const PlaylistsLibrary = () => {
  // const playlists = ["playlist1", "playlist2", "playlist3"];
  // const playlists: any[] = [];
  // todo - get playlists
  // todo - stream

  const [playlists, setPlaylists] = React.useState<Playlist[]>([]);

  useEffect(() => {
    db.collection<Playlist>("Playlist").onSnapshot((changes) => {
      setPlaylists(changes.data.map((change) => change.data));
    });
  }, [playlists]);

  const handleStreamButtonClick = () => {};
  return (
    <div className="m-1">
      <h1 className="text-white text-2xl mb-5">Playlists</h1>
      {playlists.length > 0 ? (
        <div>
          <ul>
            {playlists.map((playlist) => (
              <li
                key={playlist.id}
                className="flex flex-row place-content-between items-center group"
              >
                <h1 className="text-white font-md font-light">{playlist.id}</h1>
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
