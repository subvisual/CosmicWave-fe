import React, { useEffect } from "react";
import { Icon } from "@iconify/react";
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
    "pk/0x90a457e83a58912e705b11a0d8e9cb7aacadb449ee1a7c68ba244a091448410a751ce1b483798c3352044a472d173f2cd2f65e33b231a868d28b684f33d810ca/testcosmicwavedemo",
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
    <div className="h-[480px] flex flex-col">
      <h1 className="text-white text-2xl mb-5 px-6 py-2 m-2">Playlists</h1>
      {playlists.length === 0 && (
        <div className="flex flex-col items-center justify-center pt-5 pb-6 my-auto">
          <Icon
            icon="pixelarticons:mood-sad"
            className="w-8 h-8 text-white m-6"
          />
          <p className="mb-2 text-sm text-gray-100 text-center w-[70%]">
            Ops, it looks like you don’t have any playlist yet. Select files on
            the left to create a new playlist.
          </p>
        </div>
      )}
      <div>
        <ul>
          {playlists.map((playlist) => (
            <li
              key={playlist.id}
              className="px-6 py-2 w-full flex flex-row place-content-between items-center group py-3 hover:bg-[#424242] hover:bg-opacity-50 cursor-pointer pl-7"
            >
              <h1 className="text-white font-md font-light">{playlist.id}</h1>
              <Button
                type="button"
                handleClick={() => {
                  handleStreamButtonClick(playlist.id);
                }}
                extraClass="opacity-0 group-hover:opacity-100"
              >
                <span className="text-slate-900">Stream</span>
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PlaylistsLibrary;
