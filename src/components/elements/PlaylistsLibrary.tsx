import React, { useEffect } from "react";

import Button from "@/components/elements/Button";
import { Polybase } from "@polybase/client";
import { useSignMessage } from "wagmi";

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
    // "pk/0x98550a271a85832718f29cf70384e551b852ada0beec830f9c682b7de22d945ad828dbc50de17194936565d27ef6da583c8e8856d7f27bbd97b34419401e5b47/SoundverseTest3",
    "pk/0x90a457e83a58912e705b11a0d8e9cb7aacadb449ee1a7c68ba244a091448410a751ce1b483798c3352044a472d173f2cd2f65e33b231a868d28b684f33d810ca/testcosmicwave",
});

const PlaylistsLibrary = () => {
  const [playlists, setPlaylists] = React.useState<Playlist[]>([]);
  const sign = useSignMessage();

  const playlistCollection = db.collection<Playlist>("Playlist");

  useEffect(() => {
    playlistCollection?.onSnapshot((changes) => {
      setPlaylists(changes.data.map((change) => change.data));
    });
  }, [playlistCollection]);

  const handleStreamButtonClick = (id: string) => {
    db.signer(async (data) => {
      return {
        h: "eth-personal-sign",
        sig: await sign.signMessageAsync({ message: data }),
      };
    });

    void db
      .collection("ActivePlaylist")
      .record("1")
      .call("play", [
        db.collection<Playlist>("Playlist").record(id),
        Date.now() / 1000,
      ]);
  };

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
                  handleClick={() => {
                    handleStreamButtonClick(playlist.id);
                  }}
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
          Looks like you don´t have a playlist yet.
        </h1>
      )}
    </div>
  );
};

export default PlaylistsLibrary;
