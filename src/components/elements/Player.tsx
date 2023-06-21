import useHelia from "@/hooks/useHelia";
import useServer from "@/hooks/useServer";

import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import BrandIcon from "./BrandIcon";
import GlowBackground from "./GlowBackground";

//  useEffect(() => {
//     if (!helia.isOnline) return;
//     void fetchAudio();
//   }, [currentCid, helia.isOnline]);
// const [currentAudio, setCurrentAudio] = useState<Blob>();
// const fetchAudio = async () => {
//   const audioBlob = await helia.downloadFile(currentCid);
//   setCurrentAudio(audioBlob);
// };

interface Playing {
  total_duration: number;
  current_timestamp: number;
  song_cids: string[];
  song_names: string[];
  current_song: { filename: string; id: string; timestamp: string };
}

const Player = () => {
  const server = useServer();
  const helia = useHelia();
  const player = useRef<any>();
  const [currentSong, setCurrentSong] = useState<Playing>();
  const [srcUrls, setSrcUrls] = useState<string[]>();
  const [isMuted, setIsMuted] = useState(true);
  const [currentlyPlayingIndex, setCurrentlyPlayingIndex] = useState(0);

  useEffect(() => {
    void server.now().then(setCurrentSong);
  }, []);

  useEffect(() => {
    if (!currentSong) return;
    const cidsList = currentSong?.song_cids.map(
      (cid: string) => `https://ipfs.io/ipfs/${cid}`
    );
    // const cidsList = [
    //   "https://ipfs.io/ipfs/bafkreiacirmq6k2lznrdkk2xjz4l5kka5dmjz6tjqi5vechpjrb6bk6liq",
    //   "https://ipfs.io/ipfs/bafkreih2faqck3zm2pzn6a72er6xwaphtu76pfbujkw45iem5ydlztr4sq",
    // ];

    const index = cidsList.findIndex(
      (cid) =>
        // cid ===
        // `https://ipfs.io/ipfs/bafkreiacirmq6k2lznrdkk2xjz4l5kka5dmjz6tjqi5vechpjrb6bk6liq`
        cid === `https://ipfs.io/ipfs/${currentSong?.current_song?.id}`
    );

    setSrcUrls(cidsList);
    setCurrentlyPlayingIndex(index);

    player.current?.seekTo(currentSong?.current_song.timestamp ?? 0, "seconds");
  }, [currentSong]);

  const silenceBtn = () => {
    if (currentlyPlayingIndex < 0) {
      setIsMuted(true);
      return;
    }
    setIsMuted(!isMuted);
  };

  const computeNextSong = () => {
    if (!srcUrls && !player.current) return;
    if (srcUrls && currentlyPlayingIndex + 1 < srcUrls.length) {
      setCurrentlyPlayingIndex(currentlyPlayingIndex + 1);
    } else {
      setCurrentlyPlayingIndex(-1);
      setIsMuted(true);
    }
  };

  return (
    <div className="flex justify-center items-center h-full w-full relative">
      {helia?.isOnline && (
        <>
          <ReactPlayer
            controls={false}
            className="hidden"
            ref={(player.current = this)}
            url={srcUrls?.[currentlyPlayingIndex]}
            playing={true}
            muted={isMuted}
            loop={false}
            volume={0.3}
            onEnded={computeNextSong}
          />
          <GlowBackground isMuted={isMuted} />
          <button
            className="flex rounded-full drop-shadow-xl bg-white opacity-20 hover:opacity-70 active:drop-shadow-md h-32 w-32 justify-center items-center"
            onClick={silenceBtn}
          >
            <BrandIcon isMuted={isMuted} />
          </button>
          <div className="flex flex-row place-content-between h-fit w-full absolute z-10 bottom-0 opacity-70 ">
            <div className="text-white">
              {currentlyPlayingIndex > -1 && (
                <>
                  <span className="font-bold mr-1">You are listening to:</span>
                  <span className="">
                    {currentSong?.song_names[currentlyPlayingIndex]}
                  </span>
                </>
              )}
            </div>

            <span className="font-light text-white">
              Sit back, relax and enjoy your journey :)
            </span>
          </div>
        </>
      )}
      <div className="fixed bottom-0 right-0 p-3">
        {helia.isOnline ? (
          <div className="h-2 w-2 bg-green-400 rounded-full" />
        ) : (
          <div className="h-2 w-2 bg-red-400 rounded-full" />
        )}
      </div>
    </div>
  );
};

export default Player;
