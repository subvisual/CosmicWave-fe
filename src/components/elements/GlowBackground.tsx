import classnames from "classnames";
import React from "react";

const GlowBackground = ({ isMuted }: { isMuted: boolean }) => {
  return (
    <div
      className={classnames(
        "flex justify-center items-center h-full w-full absolute z-0",
        !isMuted && "animate-glow"
      )}
      style={{
        background: `radial-gradient(${
          isMuted ? "#94A191" : "#FF5133"
        }, transparent 60%)`,
        filter: "blur(200px)",
        transition: "background-color 5s ease",
      }}
    ></div>
  );
};

export default GlowBackground;
