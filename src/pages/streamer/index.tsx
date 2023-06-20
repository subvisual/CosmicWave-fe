import React, { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEnsAvatar, useAccount, useEnsName, useSignMessage } from "wagmi";
import { ethPersonalSignRecoverPublicKey } from "@polybase/eth";
import FileLibrary from "@/components/elements/FileLibrary";
import PlaylistsLibrary from "@/components/elements/PlaylistsLibrary";
import FileManager from "@/components/elements/FileManager";

const index = () => {
  const [publicKey, setPublicKey] = useState<`0x${string}`>();

  const { address } = useAccount();
  const sig = useSignMessage({
    message: "Sign In",
    onSuccess: (signature) => {
      const pk = ethPersonalSignRecoverPublicKey(signature, "Sign In");
      setPublicKey(`0x${pk.slice(4)}`);
    },
  });

  useEffect(() => {
    if (!address) return;
    sig?.signMessage();
  }, [address]);

  return (
    <main className="mx-auto py-6 px-28 h-full w-full">
      {!!address && !!publicKey && (
        <div className="flex h-full w-full justify-between items-center place-content-between">
          <div className="grid grid-cols-3 gap-4 w-full">
            <div className="col-span-2 w-full">
              <div className="px-6 py-2 m-2 rounded-md border border-slate-100 border-opacity-50">
                <FileManager publicKey={publicKey} />
              </div>
            </div>
            <div className="col-span-1 w-full">
              <div className="px-6 py-2 m-2 rounded-md border border-slate-100 border-opacity-50">
                <PlaylistsLibrary />
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default index;
