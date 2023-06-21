import React, { useEffect, useState } from "react";
import { useAccount, useSignMessage } from "wagmi";
import { ethPersonalSignRecoverPublicKey } from "@polybase/eth";
import PlaylistsLibrary from "@/components/elements/PlaylistsLibrary";
import FileManager from "@/components/elements/FileManager";
import { useRouter } from "next/router";

const index = () => {
  const { push } = useRouter();
  const { address } = useAccount();

  const [publicKey, setPublicKey] = useState<`0x${string}`>();

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
          <div className="grid grid-cols-3 gap-4 w-full h-[480px]">
            <div className="col-span-2 w-full h-full">
              <div className="px-6 m-2 rounded-md border border-[#424242]  h-full">
                <FileManager publicKey={publicKey} />
              </div>
            </div>
            <div className="col-span-1 w-full h-full">
              <div className=" my-2 rounded-md border border-[#424242]  h-full">
                <PlaylistsLibrary />
              </div>
            </div>
          </div>
        </div>
      )}
      {!publicKey && (
        <div className="flex h-full w-full justify-between items-center place-content-between">
          <div className="flex flex-col gap-4 w-[60%] h-[480px]">
            <h1 className="text-white text-4xl mb-5 font-thin leading-[60px]">
              &ldquo;You shouldn&lsquo;t come around here singing up to people
              like that... Anyway, what you gonna do about it?&rdquo;
            </h1>
            <h1 className="text-white text-xl mt-6 mb-5">
              Which is to say that you must re-connect your wallet and sign the
              transaction to get authenticated.
            </h1>
          </div>
        </div>
      )}
    </main>
  );
};

export default index;
