import useDatabase from "@/hooks/useDatabase";
import useHelia from "@/hooks/useHelia";
import { useEffect, useState } from "react";

const Player = () => {
  const polybase = useDatabase();
  const helia = useHelia();
  const [currentAudio, setCurrentAudio] = useState<Blob>();

  const currentCid =
    "bafkreiafnndiuw63wb4einys3sb6vu6c54nvugaxjzwiqywkpgxagnzz2m";
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
          <audio controls src={currentAudio} />
        </div>
      )}
    </>
  );
};

export default Player;
