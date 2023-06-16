import useDatabase from "@/hooks/useDatabase";
import useHelia from "@/hooks/useHelia";
import { useEffect, useState } from "react";

const Player = () => {
  const polybase = useDatabase();
  const helia = useHelia();
  const [currentAudio, setCurrentAudio] = useState<Blob>();

  const currentCid =
    "bafkreifrdpnfydzopyvgpi4iieuqt4fvyu3amjj22ffinizlegriww53lq";
  // polybase.records[0];

  const fetchAudio = async () => {
    const audioBlob = await helia.downloadFile(currentCid);
    setCurrentAudio(audioBlob);
  };

  useEffect(() => {
    if (!helia.isOnline) return;
    void fetchAudio();
  }, [currentCid, helia.isOnline]);

  return (
    <>
      {!helia.isOnline ? (
        <h1>🟡📡 ...</h1>
      ) : (
        <div className="flex flex-row items-center gap-3">
          <h1>{helia.isOnline ? "🟢" : "🔴"}</h1>
          <audio controls src={`https://ipfs.io/ipfs/${currentCid}`} />
        </div>
      )}
    </>
  );
};

export default Player;
