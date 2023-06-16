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
    <>
      {!helia.isOnline ? (
        <h1>🟡📡 ...</h1>
      ) : (
        <>
          <div className="flex flex-row items-center gap-3">
            <h1>{helia.isOnline ? "🟢" : "🔴"}</h1>
          </div>
          <ReactPlayer
            className="hidden"
            controls={false}
            ref={player}
            url={srcUrl}
            playing={true}
            muted={isMuted}
            loop={false}
          />
          <button
            className="rounded-full drop-shadow-md bg-purple-400 hover:bg-purple-400 active:bg-purple-400 active:drop-shadow-sm"
            onClick={silenceBtn}
          >
            {isMuted ? (
              <SpeakerWaveIcon onClick={silenceBtn} className="h-10 w-10 m-4" />
            ) : (
              <SpeakerXMarkIcon
                onClick={silenceBtn}
                className="h-10 w-10 m-4"
              />
            )}
          </button>
        </>
      )}
    </>
  );
};

export default Player;
