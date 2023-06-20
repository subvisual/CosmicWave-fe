import useDatabase from "@/hooks/useDatabase";
import useHelia from "@/hooks/useHelia";
import useServer from "@/hooks/useServer";
import { SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";

//  useEffect(() => {
//     if (!helia.isOnline) return;
//     void fetchAudio();
//   }, [currentCid, helia.isOnline]);
// const [currentAudio, setCurrentAudio] = useState<Blob>();
// const fetchAudio = async () => {
//   const audioBlob = await helia.downloadFile(currentCid);
//   setCurrentAudio(audioBlob);
// };

interface Song {
  total_duration: number;
  current_timestamp: number;
  song_cids: string[];
}

const Player = () => {
  const server = useServer();
  const helia = useHelia();
  const [currentSong, setCurrentSong] = useState<Song>();
  const [srcUrl, setSrcUrl] = useState<string[]>();
  const [isMuted, setIsMuted] = useState(true);
  const player = useRef();
  const [currentlyPlayingIndex, setCurrentlyPlayingIndex] = useState(0);

  useEffect(() => {
    void server.now().then(setCurrentSong);
  }, []);

  useEffect(() => {
    if (!currentSong) return;
    const cidsList = currentSong?.song_cids.map(
      (cid: string) => `https://ipfs.io/ipfs/${cid}`
    );
    // setSrcUrl(cidsList);
    setSrcUrl([
      "https://ipfs.io/ipfs/bafkreiacirmq6k2lznrdkk2xjz4l5kka5dmjz6tjqi5vechpjrb6bk6liq",
      "https://ipfs.io/ipfs/bafkreih2faqck3zm2pzn6a72er6xwaphtu76pfbujkw45iem5ydlztr4sq",
    ]);
  }, [currentSong]);

  const silenceBtn = () => {
    if (!currentSong) setIsMuted(true);
    setIsMuted(!isMuted);
  };

  // useEffect(() => {
  //   player.current?.seekTo(4, "seconds");
  // }, [player.current]);

  const computeNextSong = () => {
    if (!srcUrl && !player.current) return;
    srcUrl &&
      setCurrentlyPlayingIndex((currentlyPlayingIndex + 1) % srcUrl.length);
  };

  return (
    <div className="flex justify-center items-center h-full w-full relative">
      {helia?.isOnline && (
        <>
          <ReactPlayer
            controls={false}
            className="hidden"
            ref={(player.current = this)}
            url={srcUrl?.[currentlyPlayingIndex]}
            playing={true}
            muted={isMuted}
            loop={false}
            onEnded={computeNextSong}
          />
          <div
            className="flex justify-center items-center h-full w-full absolute z-0"
            style={{
              background: `radial-gradient(${
                isMuted ? "#94A191" : "#FF5133"
              }, transparent 60%)`,
              filter: "blur(200px)",
              transition: "background-color 5s ease",
            }}
          ></div>
          <button
            className="flex rounded-full drop-shadow-xl bg-white opacity-20 hover:opacity-70 active:drop-shadow-md h-32 w-32 justify-center items-center"
            onClick={silenceBtn}
          ></button>
          <div className="flex flex-row place-content-between h-fit w-full absolute z-10 bottom-0 opacity-70 ">
            <div className="text-white">
              <span className="font-bold mr-1">You are listening to:</span>
              <span className="">José Pinhal</span>
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
