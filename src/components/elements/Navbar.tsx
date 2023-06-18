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
  // todo: check if is a streamer
  const isStreamer = true;

  return (
    <div className="w-full py-8 px-28 absolute z-10">
      <div className="flex justify-between items-center ">
        <div className="flex flex-row gap-16 justify-center items-center">
          <Logo />
          {isStreamer && (
            <>
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
            </>
          )}
        </div>
        <ConnectButton />
      </div>
    </div>
  );
}

export default Navbar;
