import { FastestNodeClient, fetchBeacon } from "drand-client";
import { useEffect, useState } from "react";

const urls = [
  "https://api.drand.sh",
  "https://drand.cloudflare.com",
  // ...
];
const chainHash =
  "8990e7a9aaed2ffed73dbd7092123d6f289930540d7651336225dc172e51b2ce"; // (hex encoded)
const publicKey =
  "868f005eb8e6e4ca0a47c8a77ceaa5309a47978a7c71bc5cce96366b5d7a569937c529eeda66c7293784a9402801af31"; // (hex encoded)

const useDrand = () => {
  const [drandNode, setDrandNode] = useState<FastestNodeClient>();
  const options = {
    disableBeaconVerification: false, // `true` disables checking of signatures on beacons - faster but insecure!!!
    noCache: false, // `true` disables caching when retrieving beacons for some providers
    chainVerificationParams: { chainHash, publicKey }, // these are optional, but recommended! They are compared for parity against the `/info` output of a given node
  };

  useEffect(() => {
    const fastestNodeClient = new FastestNodeClient(urls, options);
    setDrandNode(fastestNodeClient);
  }, []);

  useEffect(() => {
    if (!drandNode) return;
    drandNode.start();
    return () => {
      drandNode.stop();
    };
  }, [drandNode]);

  const getRandomness = async () => {
    if (!drandNode) return;
    const theLatestBeaconFromTheFastestClient = await fetchBeacon(drandNode);
    const _randId = theLatestBeaconFromTheFastestClient.randomness.split("");
    const rand: string[] = [];

    for (let i = 0; i < _randId.length; i++) {
      const rnum = Math.floor(Math.random() * _randId.length);
      rand.push(_randId[rnum]);
    }

    return rand?.join("");
  };

  return { drandNode, getRandomness };
};

export default useDrand;
