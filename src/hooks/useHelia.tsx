import { createHelia } from "helia";
import { unixfs } from "@helia/unixfs";
import { CID } from "multiformats/cid";
import { useEffect, useState } from "react";

const useHelia = () => {
  const [helia, setHelia] = useState<any>(undefined);
  const [isOnline, setIsOnline] = useState<boolean>(false);

  useEffect(() => {
    const init = async () => {
      if (helia) return;

      const heliaNode = await createHelia();

      const nodeId = heliaNode.libp2p.peerId.toString();
      const nodeIsOnline = heliaNode.libp2p.isStarted();

      console.log("nodeId: ", nodeId);

      setHelia(heliaNode);
      setIsOnline(nodeIsOnline);
    };

    void init();
  }, [helia]);

  const fs = unixfs(helia);

  const uploadFile = async (file: File) => {
    const arrayBuffer = await file.arrayBuffer();
    const fileUint8Array = new Uint8Array(arrayBuffer);
    const fileCid = await fs.addFile({ content: fileUint8Array });
    const directoryCid = await fs.addDirectory();
    const updatedCid = await fs.cp(fileCid, directoryCid, file.name);
    console.log("fileCid", fileCid.toString());
    console.log("updatedCid", updatedCid.toString());
    return fileCid.toString();
  };

  const downloadFile = async (cid: string) => {
    if (!isOnline && !fs) return;

    const buffer = [];
    for await (const chunk of fs.cat(CID.parse(cid))) {
      buffer.push(chunk);
    }

    const blob = new Blob(buffer, { type: "audio/mpeg" });
    return blob;
  };

  return { helia, isOnline, uploadFile, downloadFile };
};

export default useHelia;
