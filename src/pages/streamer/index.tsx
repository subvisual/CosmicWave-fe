import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import UploadToIPFS from "@/components/modules/UploadToIPFS";

const index = () => {
  const { address } = useAccount();
  return (
    <main className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex gap-1 flex-col justify-center">
        <ConnectButton />
        {!!address && <UploadToIPFS />}
      </div>
    </main>
  );
};

export default index;
