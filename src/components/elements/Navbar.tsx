import React from "react";
import { ConnectButton } from "@/components/elements/CustomConnectButton";
import Logo from "@/components/elements/Logo";
import { useAccount } from "wagmi";
import Link from "next/link";
import classnames from "classnames";
import { useRouter } from "next/router";

function Navbar() {
  const { address } = useAccount();
  const router = useRouter();

  const isStreamer = address === "0x26663F46Bb55702fE9dCB6A6068dFf18Cc9b41DE";

  return (
    <div className="w-full py-8 px-28 absolute z-10">
      <div className="flex justify-between items-center ">
        <div className="flex flex-row gap-16 justify-center items-center">
          <Logo />
          {isStreamer && (
            <>
              <Link
                key="Stream"
                href="/streamer"
                className={classnames(
                  router.pathname === "/streamer" ? "font-bold" : "font-light",
                  "text-sm font-light text-center cursor-pointer text-white "
                )}
              >
                Stream
              </Link>
              <Link
                key="Listen"
                href="/player"
                className={classnames(
                  router.pathname === "/player" ? "font-bold" : "font-light",
                  "text-sm  text-center cursor-pointer text-white "
                )}
              >
                Listen
              </Link>
            </>
          )}
        </div>
        <ConnectButton />
      </div>
    </div>
  );
}

export default Navbar;
