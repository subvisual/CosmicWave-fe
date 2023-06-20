import { Polybase } from "@polybase/client";

interface ForeignKey {
  collection_id: string;
  id: string;
}

interface Song {
  id: string;
  title: string;
  artist: string;
  filename: string;
  duration: number;
  owner: ForeignKey;
}

interface Playlist {
  id: string;
  name: string;
  songs: ForeignKey[];
  owner: ForeignKey;
}

interface ActivePlaylist {
  id: string;
  playing: boolean;
  startTime: number;
  playlist: ForeignKey;
  owner: ForeignKey;
}

const useDatabase = (publicKey: `0x${string}`) => {
  const db = new Polybase({
    defaultNamespace:
      "pk/0x98550a271a85832718f29cf70384e551b852ada0beec830f9c682b7de22d945ad828dbc50de17194936565d27ef6da583c8e8856d7f27bbd97b34419401e5b47/SoundverseTest3",
  });

  const saveSong = async (
    cid: string,
    title: string,
    artist: string,
    filename: string,
    duration: number
  ) => {
    const { data: song } = await db
      .collection<Song>("Song")
      .create([
        cid,
        title,
        artist,
        filename,
        duration,
        db.collection("Streamer").record(publicKey),
      ]);

    return song;
  };

  const createPlaylist = async (name: string, songsCIDs: string[]) => {
    const songs = songsCIDs.map((cid) =>
      db.collection<Song>("Song").record(cid)
    );

    const { data: playlist } = await db
      .collection<Playlist>("Playlist")
      .create([name, songs]);

    return playlist;
  };

  const playPlaylist = async (playlistId: string, timestamp: number) => {
    const { data: active } = await db
      .collection<ActivePlaylist>("ActivePlaylist")
      .record("1")
      .call("play", [
        db.collection<Playlist>("Playlist").record(playlistId),
        timestamp,
      ]);

    return active;
  };

  const stopPlaylist = async () => {
    const { data: active } = await db
      .collection<ActivePlaylist>("ActivePlaylist")
      .record("1")
      .call("stop");

    return active;
  };

  const getPlaylists = async () => {
    const { data: playlists } = await db.collection<Playlist>("Playlist").get();

    return playlists;
  };

  const getPlaylist = async (playlistId: string) => {
    const { data: playlist } = await db
      .collection<Playlist>("Playlist")
      .record(playlistId)
      .get();

    if (!playlist) return;

    const songs = await Promise.all(
      playlist.songs.map(
        async (song) =>
          (
            await db.collection<Song>("Song").record(song.id).get()
          ).data
      )
    );

    return { ...playlist, songs };
  };

  const getSongs = async () => {
    const { data: songs } = await db.collection<Song>("Song").get();

    return songs.map((song) => ({ ...song.data }));
  };

  return {
    saveSong,
    createPlaylist,
    playPlaylist,
    stopPlaylist,
    getPlaylists,
    getPlaylist,
    getSongs,
  };
};

export default useDatabase;
