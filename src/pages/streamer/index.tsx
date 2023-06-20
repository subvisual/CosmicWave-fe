import React, { useEffect, useState } from "react";
import { useAccount, useSignMessage } from "wagmi";
import { ethPersonalSignRecoverPublicKey } from "@polybase/eth";
import PlaylistsLibrary from "@/components/elements/PlaylistsLibrary";
import FileManager from "@/components/elements/FileManager";
import { useRouter } from "next/router";

const index = () => {
  const { push } = useRouter();
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
    const isStreamer = address
      ? address === "0x26663F46Bb55702fE9dCB6A6068dFf18Cc9b41DE"
      : false;
    if (!isStreamer) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      push("/player");
      return;
    }
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
