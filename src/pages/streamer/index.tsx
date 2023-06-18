import React, { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEnsAvatar, useAccount, useEnsName, useSignMessage } from "wagmi";
import { ethPersonalSignRecoverPublicKey } from "@polybase/eth";

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

  const {
    data: ensName,
    isError,
    isLoading,
  } = useEnsName({
    address,
  });

  const {
    data: ensAvatar,
    isError: isAvatarError,
    isLoading: isAvatarLoading,
  } = useEnsAvatar({
    name: ensName,
  });

  useEffect(() => {
    if (!address) return;
    sig?.signMessage();
  }, [address]);

  console.log(ensAvatar);

  return (
    <main className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex gap-1 flex-col justify-center">
        <ConnectButton />

        {!!address && !!publicKey && (
          <>
            <div className="flex flex-col text-center justify-center">
              {isAvatarLoading && <div>Fetching avatar</div>}
              {isAvatarError && <div>Error fetching avatar</div>}
              {ensAvatar && (
                <img height={50} width={50} src={ensAvatar} alt="avatar" />
              )}
              {isLoading && <div>Fetching name</div>}
              {isError && <div>Error fetching name</div>}
              <h1 className="text-2xl font-bold">Welcome {ensName}</h1>
            </div>
            <UploadToIPFS publicKey={publicKey} />
          </>
        )}
      </div>
    </main>
  );
};

export default index;
