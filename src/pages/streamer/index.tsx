import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import UploadToIPFS from "@/components/modules/UploadToIPFS";
import { useEnsAvatar, useAccount, useEnsName } from "wagmi";

const index = () => {
  const { address } = useAccount();

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

  console.log(ensAvatar);

  return (
    <main className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex gap-1 flex-col justify-center">
        <ConnectButton />
        {!!address && (
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
            <UploadToIPFS />
          </>
        )}
      </div>
    </main>
  );
};

export default index;
