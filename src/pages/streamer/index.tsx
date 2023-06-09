import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

const index = () => {
  const { address } = useAccount();
  console.log(address);
  return <ConnectButton />;
};

export default index;
