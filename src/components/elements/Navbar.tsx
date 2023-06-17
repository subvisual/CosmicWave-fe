import React from "react";
import { ConnectButton } from "@/components/elements/CustomConnectButton";
import Logo from "@/components/elements/Logo";

function Navbar() {
  return (
    <div className="w-full py-8 px-28 absolute z-10">
      <div className="flex justify-between items-center ">
        <Logo />
        <ConnectButton />
      </div>
    </div>
  );
}

export default Navbar;
