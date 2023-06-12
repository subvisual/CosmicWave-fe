import React, { useEffect, useState } from "react";
import { create } from "ipfs-http-client";

interface Props {
  setIpfs: (http: any) => void;
}

const ConnectToIPFS = ({ setIpfs }: Props) => {
  const [error, setError] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState(false);
  const multiaddr = {
    host: "127.0.0.1",
    port: 5001,
    protocol: "http",
    "api-path": "/api/v0",
  };

  const connect = async () => {
    const http = create(multiaddr);
    try {
      // eslint-disable-next-line @typescript-eslint/await-thenable
      const online = await http.isOnline();
      if (online) {
        setIpfs(http);
        setError(false);
        setIsConnected(true);
      }
    } catch (err: any) {
      setError(true);
      setIsConnected(false);
    }
  };

  useEffect(() => {
    if (!isConnected) {
      void connect();
    }
  }, [isConnected]);
};

export default ConnectToIPFS;
