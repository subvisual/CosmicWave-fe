import React from "react";

interface Props {
  isMuted: boolean;
}

const BackgroundBreath = ({ isMuted }: Props) => {
  return (
    <div
      className="flex justify-center items-center h-full w-full absolute z-0 animate-pulse "
      style={{
        background: `radial-gradient(${
          isMuted ? "#94A191" : "#FF5133"
        }, transparent 80%)`,
        filter: "blur(200px)",
      }}
    ></div>
  );
};

export default BackgroundBreath;
