import useDatabase from "@/hooks/useDatabase";
import useHelia from "@/hooks/useHelia";
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

const Player = () => {
  const polybase = useDatabase();
  const helia = useHelia();
  const currentCid =
    "bafkreifrdpnfydzopyvgpi4iieuqt4fvyu3amjj22ffinizlegriww53lq";
  // polybase.records[0];

  const [srcUrl, setSrcUrl] = useState<string>();
  const [isMuted, setIsMuted] = useState(true);
  const player = useRef();

  useEffect(() => {
    if (!currentCid) return;
    setSrcUrl(`https://ipfs.io/ipfs/${currentCid}`);
  }, [currentCid]);

  const silenceBtn = () => {
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    player.current?.seekTo(4, "seconds");
  }, [player.current]);

  return (
    <div className="flex justify-center items-center h-full w-full relative">
      {helia?.isOnline && (
        <>
          <ReactPlayer
            controls={true}
            className="hidden"
            ref={player}
            url={srcUrl}
            playing={true}
            muted={isMuted}
            loop={true}
          />
          <div
            className="flex justify-center items-center h-full w-full absolute z-0 "
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
          >
            {/* <PlayIcon className="h-16 w-16 text-white text-opacity-60" /> */}
          </button>
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
