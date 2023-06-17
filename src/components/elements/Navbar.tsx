import React from "react";
import { ConnectButton } from "@/components/elements/ConnectButton";
import Logo from "@/components/elements/Logo";

function Navbar() {
  return (
    <div className="w-full py-8 px-28 absolute z-10">
      <div className="flex justify-between items-center ">
        <Logo />
        <div className="flex gap-3">
          <ConnectButton />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
