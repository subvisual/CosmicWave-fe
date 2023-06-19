import { createHelia } from "helia";
import { unixfs } from "@helia/unixfs";
import { CID } from "multiformats/cid";
import { useEffect, useState } from "react";
import { createLibp2p } from "libp2p";
import { identifyService } from "libp2p/identify";
import { circuitRelayTransport } from "libp2p/circuit-relay";
import { webSockets } from "@libp2p/websockets";
import { webTransport } from "@libp2p/webtransport";
import { webRTCDirect, webRTC } from "@libp2p/webrtc";
import { noise } from "@chainsafe/libp2p-noise";
import { yamux } from "@chainsafe/libp2p-yamux";
import { bootstrap } from "@libp2p/bootstrap";
import { kadDHT } from "@libp2p/kad-dht";
import { mplex } from "@libp2p/mplex";

const useHelia = () => {
  const [helia, setHelia] = useState<any>(undefined);
  const [isOnline, setIsOnline] = useState<boolean>(false);

  useEffect(() => {
    const init = async () => {
      if (helia) return;

      const libp2p = await createLibp2p({
        // transports allow us to dial peers that support certain types of addresses
        transports: [
          webSockets(),
          webTransport(),
          webRTC(),
          webRTCDirect(),
          circuitRelayTransport({
            // use content routing to find a circuit relay server we can reserve a
            // slot on
            discoverRelays: 1,
          }),
        ],
        connectionEncryption: [noise()],
        streamMuxers: [yamux(), mplex()],
        peerDiscovery: [
          bootstrap({
            list: [
              "/dnsaddr/bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN",
              "/dnsaddr/bootstrap.libp2p.io/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb",
              "/dnsaddr/bootstrap.libp2p.io/p2p/QmZa1sAxajnQjVM8WjWXoMbmPd7NsWhfKsPkErzpm9wGkp",
              "/dnsaddr/bootstrap.libp2p.io/p2p/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa",
              "/dnsaddr/bootstrap.libp2p.io/p2p/QmcZf59bWwK5XFi76CZX8cbJ4BhTzzA3gU1ZjYZcYW3dwt",
            ],
          }),
        ],
        services: {
          // the identify service is used by the DHT and the circuit relay transport
          // to find peers that support the relevant protocols
          identify: identifyService(),

          // the DHT is used to find circuit relay servers we can reserve a slot on
          dht: kadDHT({
            // browser node ordinarily shouldn't be DHT servers
            clientMode: true,
          }),
        },
      });

      const heliaNode = await createHelia({ libp2p });

      const nodeId = heliaNode.libp2p.peerId.toString();
      const nodeIsOnline = heliaNode.libp2p.isStarted();

      console.log("nodeId: ", nodeId);

      setHelia(heliaNode);
      setIsOnline(nodeIsOnline);
    };

    void init();
  }, [helia]);

  useEffect(() => {
    if (!helia) return;

    helia.libp2p.addEventListener("peer:discovery", (evt: any) => {
      const peerInfo = evt.detail;
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      console.log(`Found peer ${peerInfo.id.toString()}`);

      // dial them when we discover them
      helia.libp2p.dial(peerInfo.id).catch((err: any) => {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        console.log(`Could not dial ${peerInfo.id.toString()}`, err);
      });
    });
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
