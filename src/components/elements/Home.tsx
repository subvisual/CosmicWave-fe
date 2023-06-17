import Link from "next/link";
import React from "react";
import Button from "./Button";

const Home = () => {
  return (
    <div className="flex flex-col gap-6 w-full items-center justify-center">
      <span className="text-6xl text-white m-3 text-center">
        <p>Welcome to your</p>
        <p>decentralised radio station</p>
      </span>
      <Link
        href="/player"
        className="w-fit h-fit z-10 justify-center items-center"
      >
        <Button type={"button"}>
          <span className="text-slate-900 px-4 py-2 text-2xl">Tune in</span>
        </Button>
      </Link>
    </div>
  );
};

export default Home;
